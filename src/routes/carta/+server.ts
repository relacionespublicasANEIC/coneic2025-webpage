import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import { PDF_SERVICES_CLIENT_ID as clientId } from "$env/static/private";
import { PDF_SERVICES_CLIENT_SECRET as clientSecret } from "$env/static/private";
import { REDIS_URL } from "$env/static/private";
import { createReadStream } from "fs";
import { MimeType, OutputFormat } from "@adobe/pdfservices-node-sdk";
import { ServicePrincipalCredentials, PDFServices } from "@adobe/pdfservices-node-sdk";
import { DocumentMergeParams, DocumentMergeJob, DocumentMergeResult } from "@adobe/pdfservices-node-sdk";
import { Readable } from 'stream';
import { createClient } from "redis";
import path from "path";

async function streamToBuffer(readableStream: Readable): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};

async function createLetterFromTemplate(templatePath: string, values: { [key: string]: string }): Promise<Buffer<ArrayBuffer>> {
    try {
        const readStream = createReadStream(templatePath);
        const credentials = new ServicePrincipalCredentials({ clientId, clientSecret });
        const pdfServices = new PDFServices({ credentials });
        const inputAsset = await pdfServices.upload({ readStream, mimeType: MimeType.DOCX });
        const params = new DocumentMergeParams({ jsonDataForMerge: values, outputFormat: OutputFormat.PDF });
        const job = new DocumentMergeJob({ inputAsset, params });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({ job });
        const pdfServicesResponse = await pdfServices.getJobResult({ pollingURL, resultType: DocumentMergeResult });

        if (!pdfServicesResponse) throw error(500, "Unable to create the letter");

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse!.result!.asset;
        const streamAsset = await pdfServices.getContent({ asset: resultAsset });
        let buffer = await streamToBuffer(streamAsset.readStream as Readable);
        return Buffer.from(buffer);
    } catch {
        throw error(500, "Unable to create the letter");
    };
};

const redis = await createClient({ url: REDIS_URL }).connect();

export const GET: RequestHandler = async ({ url }) => {
    let name = url.searchParams.get("name");
    let university = url.searchParams.get("university");
    if (!name || !university) return error(400, "Request does not contain all the required values.");

    // Create the letter
    let templatePath = path.join(process.cwd(), "static", "template.docx");
    let letter = await createLetterFromTemplate(templatePath, { name, university }).catch((_) => error(500, "Unable to create the letter."));
    await redis.incr("letter_requested").catch((_) => console.error("Failed to update the letter counter"));
    return new Response(letter, { headers: { 'Content-Type': "application/pdf" } });
};