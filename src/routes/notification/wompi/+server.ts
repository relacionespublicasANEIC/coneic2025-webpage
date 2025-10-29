import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { createClient } from "redis";
import { error, json } from "@sveltejs/kit";
import sendEmail from "$lib/server/sendEmail";
import type { RequestHandler } from "./$types";

// Defines a handler for events from wompi.
// https://docs.wompi.co/docs/colombia/eventos/
export const POST: RequestHandler = async ({ request }) => {
    let body = await request.json().catch(() => error(400, "Body is void or not json."));

    // Check the body is a WompiEvent.
    if (!body?.event || !body?.data?.transaction) {
        throw error(400, "Body json has a invalid shape.");
    };

    // Handle the WompiEvent.
    if (body.event !== "transaction.updated") {
        console.log("An event has come in, but it's useless for us");
        return json({ "message": "Skipped event." }, { status: 200 });
    };

    const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));
    let transaction = body.data.transaction;
    console.log(`Handling event of transaction with reference ${transaction.reference}`);
    //Posible values: PENDING, APPROVED, DECLINED, ERROR, VOIDED

    if (transaction.status === "DECLINED" || transaction.status === "ERROR" || transaction.status === "VOIDED") {
        console.log(`Transaction with reference ${transaction.reference} was failed.`);
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
        console.log(`Transaction with reference ${transaction.reference} was saved in database.`);

        // Retrieve previous info to send email
        let prevData = await redis.hGet(pre + "custom-data-list", transaction.reference).catch((_) => error(500, "Previous information does not exist."));
        if (!prevData) throw error(500, "Previous information does not exist.");
        let liveData = JSON.parse(prevData);

        // Send confirmation email to user.
        await sendEmail(liveData.user.name, liveData.user.email, liveData.carnet.name, transaction.reference).catch((_) => error(500, "Unable to send email"));
        console.log("Confirmation email was sent to user.");
        await redis.lPush(pre + "emailed-id-list", [transaction.id, liveData.user.email]).catch((_) => console.error("Email was sent but list was not updated."));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
};