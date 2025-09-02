import { createClient } from "redis";
import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import sendEmail from "$lib/server/sendEmail";

// https://development.coneic.aneiccolombia.com/paypal	2TV3748022168523X
// Defines a handler for events from paypal.
export const POST: RequestHandler = async ({ request }) => {
    let body = await request.json().catch(() => error(400, "Body is void or not json."));

    // Check the body is a PayPal event.
    if (!body?.event_type || !body.resource) {
        return error(400, "Body json has a invalid shape.");
    };

    // Handle the WompiEvent.
    const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));
    const transaction = body.resource;

    if (body.event_type === "PAYMENT.CAPTURE.PENDING") {
        return json({ message: "Server knows that transaction is pending." }, { status: 200 });
    };

    if (body.event_type === "PAYMENT.CAPTURE.DECLINED") {
        await redis.incr(pre + "failed-requests").catch((_) => console.error("Counter did not increment."));
        await redis.hDel(pre + "custom-data-list", transaction.invoice_id).catch((_) => console.error("Info could not be removed"));
        return json({ "message": "This event incremented failure counter by one." }, { status: 200 });
    };

    if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        // Save data from notification to db.
        let multi = redis.multi();
        multi.incr(pre + "aproved-requests");
        multi.hSet(pre + "transaction-data-list", transaction.id, JSON.stringify(transaction))
        multi.lPush(pre + "aproved-transactions-list", transaction.id);
        await multi.exec().catch((_) => error(500, "Unable to write in db"));

        // Retrieve previous info to send email.
        let prevData = await redis.hGet(pre + "custom-data-list", transaction.invoice_id).catch((_) => error(500, "Previous information does not exist."));
        if (!prevData) return error(500, "Previous information does not exist.");
        let prevDataLive = JSON.parse(prevData);

        // Send confirmation email to user.
        let userData = prevDataLive.user;
        let transactionData = { carnet_id: prevDataLive.carnet.id, id: transaction.id };
        await Promise.all([
            sendEmail({ userData, transactionData }),
            redis.lPush(pre + "emailed-id-list", transaction.id)
        ]).catch((_) => error(500, "Unable to send email."));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return error(400, "Body json has a invalid shape.");
};