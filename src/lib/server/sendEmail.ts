import { GOOGLE_ANEICCOLOMBIA_PASSWORD } from "$env/static/private";
import nodemailer from "nodemailer";
import mailTemplate from "./mail.html?raw";

/**
 * Sends a confirmation email to a user after a successful transaction.
 *
 * @param {string} name - The recipient's full name.
 * @param {string} address - The recipient's email address.
 * @param {string} carnetTitle - The title or type of the event ticket/ID card.
 * @param {string} transactionId - The unique identifier for the transaction.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the email was sent successfully, and `false` otherwise.
 */
export default async function (
    name: string,
    address: string,
    carnetTitle: string,
    transactionId: string
): Promise<boolean> {
    let html = mailTemplate
        .replace("{{name}}", name)
        .replace("{{id}}", transactionId)
        .replace("{{carnet}}", carnetTitle);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 465, secure: true,
        auth: { user: "aneic.colombia@gmail.com", pass: GOOGLE_ANEICCOLOMBIA_PASSWORD }
    });

    try {
        await transporter.sendMail({
            from: { name: "Comité organizador CONEIC 2025", address: "aneic.colombia@gmail.com" },
            to: { name, address },
            subject: "Confirmación de su participación en el CONEIC 2025", html, attachDataUrls: true
        });
        return true;
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        return false;
    };
};