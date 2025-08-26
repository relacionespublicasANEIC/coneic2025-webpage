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

    //Posible values: PENDING, APPROVED, DECLINED, ERROR, VOIDED
    let transaction = body.data.transaction;

    // Transaction made with a card was cancelled.
    if (transaction.status === "VOIDED") {
        let multi = redis.multi();
        multi.incr("failed_requests");
        multi.decr("aproved_request");
        multi.json.del(transaction.id);
        await multi.exec().catch((_) => error(400, "State could not be updated in db."));
    };

    if (transaction.status === "DECLINED" || transaction.status === "ERROR") {
        await redis.incr("failed_requests").catch((_) => console.error("Counter did not increment."));
        return json({ "message": "This event incremented failure counter by one." }, { status: 200 });
    };

    if (transaction.status === "APPROVED") {
        let multi = redis.multi();
        multi.incr("aproved_request");
        multi.json.set(transaction.id, "$", transaction);
        await multi.exec().catch((_) => error(400, "Unable to write in db"));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
}