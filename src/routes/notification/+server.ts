import { createClient } from "redis";
import { REDIS_URL } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


// Defines a handler for events from wompi.
// https://docs.wompi.co/docs/colombia/eventos/

interface WompiEvent {
    "event": "transaction.updated" | "nequi_token.updated" | "bancolombia_transfer_token.updated"
    "data": {
        "transaction": {
            "id": string,
            [key: string]: string,
        }
    }
}

const redis = await createClient({ url: REDIS_URL }).connect();

export const POST: RequestHandler = async ({ request }) => {
    let body: WompiEvent = await request.json();

    if (body.event !== "transaction.updated") {
        console.log("Useless event");
        return json({}, { status: 200 });
    };

    let transaction = body.data.transaction;
    await redis.json.set(transaction.id, "$", transaction).catch((_) => error(400, "Unable to write in db"));
    return json({}, { status: 200 });
}