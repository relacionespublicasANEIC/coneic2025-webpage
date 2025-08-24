import { createClient } from "redis";
import { REDIS_URL } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const redis = await createClient({ url: REDIS_URL }).connect();

// Defines a handler for events from wompi.
// https://docs.wompi.co/docs/colombia/eventos/
export const POST: RequestHandler = async ({ request }) => {
    let body = await request.json().catch(() => error(400, "Body is void or not json."));

    // Check the body is a WompiEvent.
    if (!body?.event || !body?.data?.transaction) {
        return error(400, "Body json has a invalid shape.");
    };

    // Handle the WompiEvent.
    if (body.event !== "transaction.updated") {
        return json({ "message": "Skipped event." }, { status: 200 });
    };

    let transaction = body.data.transaction;
    if (transaction.status === "DECLINED") {
        await redis.incr("declined_request").catch((_) => console.error("Counter did not increment."));
        return json({ "message": "Total declined requests incresed by one." }, { status: 200 });
    };

    if (transaction.status === "APPROVED") {
        await redis.incr("aproved_request").catch((_) => console.error("Counter did not increment."));
        await redis.json.set(transaction.id, "$", transaction).catch((_) => error(400, "Unable to write in db"));
        return json({ "message": "Aproved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
}