import { createClient } from "redis";
import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { GOOGLE_ANEICCOLOMBIA_PASSWORD } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import badges from "../../data/badges.json";
import nodemailer from "nodemailer";
import mailTemplate from "./mail.html?raw";

async function sendEmail(userData: { full_name: string, email: string }, transactionData: { payment_link_id: string, id: string }) {
    let carnet = badges.find(i => i.payment === transactionData.payment_link_id)?.title;
    if (!carnet) throw "Payment link does not match any carnet"

    let html = mailTemplate
        .replace("{{name}}", userData.full_name)
        .replace("{{id}}", transactionData.id)
        .replace("{{carnet}}", carnet);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 465, secure: true,
        auth: {
            user: "aneic.colombia@gmail.com",
            pass: GOOGLE_ANEICCOLOMBIA_PASSWORD
        }
    });

    await transporter.sendMail({
        from: { name: "Comité organizador CONEIC 2025", address: "aneic.colombia@gmail.com" },
        to: userData.email,
        subject: "Confirmación de su participación en el CONEIC 2025", html, attachDataUrls: true
    });

    return true;
};

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

        // Send confirmation email to user.
        let userData = { full_name: transaction.customer_data.full_name, email: transaction.customer_email };
        let transactionData = { payment_link_id: transaction.payment_link_id, id: transaction.id };
        await Promise.all([
            sendEmail(userData, transactionData),
            redis.lPush(pre + "emailed-id-list", transaction.id)
        ]).catch((_) => error(500, "Unable to send email."));
        return json({ "message": "Approved request was saved in database." }, { status: 200 });
    };

    return json({ "message": "Event was not handled." }, { status: 200 });
};