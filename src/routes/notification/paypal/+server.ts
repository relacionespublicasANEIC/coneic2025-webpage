import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from "$env/static/private";
import { createClient } from "redis";
import { error, json } from "@sveltejs/kit";
import sendEmail from "$lib/server/sendEmail";
import paypal from "@paypal/paypal-server-sdk";
import type { RequestHandler } from "./$types";

async function capturePayment(id: string) {
    const client = new paypal.Client({
        environment: (PAYPAL_MODE === "production") ? paypal.Environment.Production : paypal.Environment.Sandbox,
        clientCredentialsAuthCredentials: {
            oAuthClientId: PAYPAL_CLIENT_ID,
            oAuthClientSecret: PAYPAL_SECRET
        }
    });

    const orderController = new paypal.OrdersController(client);
    return await orderController.captureOrder({ id });
};

// Defines a handler for events from paypal.
// https://development.coneic.aneiccolombia.com/paypal
export const POST: RequestHandler = async ({ request }) => {
    let body = await request.json().catch(() => error(400, "Body is void or not json."));

    // Check the body is a PayPal event.
    if (!body?.event_type || !body.resource) {
        throw error(400, "Body json has a invalid shape.");
    };

    // Handle the PayPal event.
    const transaction = body.resource;
    const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));
    if (body.event_type === "CHECKOUT.ORDER.APPROVED") {
        console.log(`Order ${transaction.id} has been approved. Starting capture process.`);
        await capturePayment(transaction.id).catch((_) => error(500, "Unable to start capture of payment."));
        return json({ message: "Order capture was started." }, { status: 200 });
    };

    if (body.event_type === "PAYMENT.CAPTURE.DECLINED") {
        console.log(`Capturing order with reference ${transaction.invoice_id} has failed.`);
        await redis.incr(pre + "failed-requests").catch((_) => console.error("Counter did not increment."));
        await redis.hDel(pre + "custom-data-list", transaction.invoice_id).catch((_) => console.error("Info could not be removed"));
        return json({ "message": "This event incremented failure counter by one." }, { status: 200 });
    };

    if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        console.log(`Capturing order with reference ${transaction.invoice_id} has succeded.`);

        // Save data from notification to db.
        let multi = redis.multi();
        multi.incr(pre + "aproved-requests");
        multi.hSet(pre + "transaction-data-list", transaction.invoice_id, JSON.stringify(transaction))
        multi.lPush(pre + "aproved-transactions-list", transaction.invoice_id);
        await multi.exec().catch((_) => error(500, "Unable to write in db"));
        console.log("Transaction data was saved in database.");

        // Retrieve previous info to send email.
        let prevData = await redis.hGet(pre + "custom-data-list", transaction.invoice_id).catch((_) => error(500, "Previous information does not exist."));
        if (!prevData) throw error(500, "Previous information does not exist.");
        let liveData = JSON.parse(prevData);

        // Send confirmation email to user.
        await sendEmail(liveData.user.name, liveData.user.email, liveData.carnet.name, transaction.invoice_id).catch((_) => error(500, "Unable to send email"));
        console.log("Confirmation email was sent to user.");
        await redis.lPush(pre + "emailed-id-list", [transaction.invoice_id, liveData.user.email]).catch((_) => console.error("Email was sent but list was not updated."));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
};