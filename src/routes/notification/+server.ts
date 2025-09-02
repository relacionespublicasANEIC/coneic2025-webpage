import { createClient } from "redis";
import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import badges from "../../data/badges.json";
import sendEmail from "$lib/server/sendEmail";

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

    const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));

    //Posible values: PENDING, APPROVED, DECLINED, ERROR, VOIDED
    let transaction = body.data.transaction;

    if (transaction.status === "DECLINED" || transaction.status === "ERROR" || transaction.status === "VOIDED") {
        await redis.incr(pre + "failed-requests").catch((_) => console.error("Counter did not increment."));
        await redis.hDel(pre + "custom-data-list", transaction.reference).catch((_) => console.error("Info could not be removed"));
        return json({ "message": "This event incremented failure counter by one." }, { status: 200 });
    };

    if (transaction.status === "APPROVED") {
        // Save data from notification to db.
        let multi = redis.multi();
        multi.incr(pre + "aproved-requests");
        multi.hSet(pre + "transaction-data-list", transaction.id, JSON.stringify(transaction))
        multi.lPush(pre + "aproved-transactions-list", transaction.id);
        await multi.exec().catch((_) => error(500, "Unable to write in db"));

        // Retrieve previous info to send email
        // TODO: Change this because we are querying to db only for a single field.
        let prevData = await redis.hGet(pre + "custom-data-list", transaction.reference).catch((_) => error(500, "Previous information does not exist."));
        if (!prevData) return error(500, "Previous information does not exist.");
        let prevDataLive = JSON.parse(prevData);

        // Send confirmation email to user.
        let userData = { full_name: transaction.customer_data.full_name, email: transaction.customer_email };
        let transactionData = { carnet_id: prevDataLive.carnet.id, id: transaction.id };
        await Promise.all([
            sendEmail({ userData, transactionData }),
            redis.lPush(pre + "emailed-id-list", transaction.id)
        ]).catch((_) => error(500, "Unable to send email."));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
};