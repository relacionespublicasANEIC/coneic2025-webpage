import { GOOGLE_ANEICCOLOMBIA_PASSWORD } from "$env/static/private";
import nodemailer from "nodemailer";
import mailTemplate from "./mail.html?raw";
import badges from "../../data/badges.json";

interface MessageData {
    userData: { full_name: string, email: string };
    transactionData: { carnet_id: string, id: string }
};

export default async function (input: MessageData) {
    let carnet = badges.find(i => i.link === transactionData.carnet_id)?.title;
    if (!carnet) throw "Payment link does not match any carnet"
    let { userData, transactionData } = input;

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