import { WOMPI_ENDPOINT, REDIS_URL } from "$env/static/private";
import { createClient } from "redis";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const redis = await createClient({ url: REDIS_URL }).connect();

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
    let message;
    switch (body.data.status) {
        case "PENDING":
            message = "Estamos esperando aún que la transacción se complete.";
            break;
        case "DECLINED":
        case "ERROR":
            message = body.data.status_message;
            break;
        case "VOIDED":
            message = "La transacción fue cancelada";
            break;
        case "APPROVED":
            message = await redis.json.get(id);
            console.info("Redis db was called");
            break;
        default:
            return error(400, "Body from wompi was malformed");
    };

    return { status: body.data.status, message };
};