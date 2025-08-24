import { WOMPI_ENDPOINT, REDIS_URL, QR_CODE_KEY } from "$env/static/private";
import { createClient } from "redis";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const redis = await createClient({ url: REDIS_URL }).connect();

// Creates a hash to validate QR was created in this page.
async function createHash(name: string, typeDocument: string, documentId: string): Promise<string> {
    // Create input info.
    let sourceString = `${typeDocument}${documentId}${name}${QR_CODE_KEY}`;
    let encoder = new TextEncoder();
    let sourceBytes = encoder.encode(sourceString);

    // Create the hash.
    let hashBytes = await crypto.subtle.digest("SHA-256", sourceBytes);
    let hashString = Array.from(new Uint8Array(hashBytes)).map(i => i.toString(16).padStart(2, "0")).join("");
    return hashString;
};

export const load: PageServerLoad = async ({ url }) => {
    let id = url.searchParams.get("id");

    if (!id || id === "") {
        return error(400, "Request does not have an id.");
    };

    // Get transaction from wompi endpoint
    let requestUrl = `${WOMPI_ENDPOINT}/v1/transactions/${id}`;
    let res = await fetch(requestUrl).catch((_) => error(400, "Unable to fecth transaction info"));
    if (res.status !== 200) return error(400, "Unable to fecth transaction info");
    let body = await res.json().catch((_) => error(400, "Unable to fecth transaction info"));
    if (!body?.data?.id || body?.data?.id !== id) error(400, "Unable to fecth transaction info");

    // Check status of transaction.
    let title, message;
    switch (body.data.status) {
        case "PENDING":
            title = "PENDIENTE";
            message = "Estamos esperando aún que la transacción se complete.";
            break;
        case "DECLINED":
        case "ERROR":
            title = "FALLIDA";
            message = body.data.status_message;
            break;
        case "VOIDED":
            title = "CANCELADA";
            message = "La transacción fue cancelada";
            break;
        case "APPROVED":
            title = "COMPLETADA"
            let trasanction = await redis.json.get(id).catch((_) => error(500, "Unable to request transaction info."));
            let { legal_id, full_name, legal_id_type } = trasanction.customer_data;
            let hash = await createHash(full_name, legal_id_type, legal_id).catch((_) => error(500, "Unable to create a hash for this transaction."));
            message = { hash, trasanction };
            break;
        default:
            return error(400, "Body from wompi was malformed");
    };

    return { status: body.data.status, title, message };
};