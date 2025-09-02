import { redirect, fail } from "@sveltejs/kit";
import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { INTEGRITY_KEY_WOMPI } from "$env/static/private";
import { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from "$env/static/private";
import { PUBLIC_KEY_WOMPI, PUBLIC_PAGE_URL } from "$env/static/public";
import { createClient } from "redis";
import type { Actions } from "./$types";
import { randomUUID } from "crypto";
import paypal from "@paypal/paypal-server-sdk";
import badges from "../data/badges.json";

// Creates a integrity signature for a wompi transaction.
// https://docs.wompi.co/docs/colombia/widget-checkout-web
async function createIntegritySignature(reference: string, amount: string): Promise<string> {
    const string = `${reference}${amount}COP${INTEGRITY_KEY_WOMPI}`;
    const encondedText = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const actions = {
    default: async ({ request }) => {
        // Extract fields form request.
        const data = await request.formData();
        let carnet_id = data.get("carnet_id")?.toString();
        let name = data.get("name")?.toString();
        let email = data.get("email")?.toString();
        let university = data.get("university")?.toString();
        let address = data.get("address")?.toString();
        let phone_number = data.get("phone_number")?.toString();
        let whatsapp = data.get("whatsapp")?.toString();
        let sex = data.get("sex")?.toString();
        let blood_type = data.get("blood_type")?.toString();
        let rh_factor = data.get("rh_factor")?.toString();
        let emergency_name = data.get("emergency_name")?.toString();
        let emergency_phone = data.get("emergency_phone")?.toString();
        let feeding = data.get("feeding")?.toString();
        let health = data.get("health")?.toString();
        let colombian = data.get("colombian")?.toString();

        // Get carnet info with the id.
        let carnetInfo = badges.find(i => i.link === carnet_id);
        if (!carnetInfo) return fail(400, { message: "Carnet was not found by its id." });

        // Decide if wompi or paypal.
        let redirectUrl: URL | string;
        const reference = `carnet${carnetInfo.link}-${randomUUID()}`;
        if (colombian) {
            // Person is colombian.
            const integrity = await createIntegritySignature(reference, carnetInfo.price_in_cents).catch((_) => fail(500, { message: "Unable to create signature." }));
            const requestUrl = new URL("https://checkout.wompi.co/p/");
            requestUrl.searchParams.append("public-key", PUBLIC_KEY_WOMPI);
            requestUrl.searchParams.append("currency", "COP");
            requestUrl.searchParams.append("amount-in-cents", carnetInfo.price_in_cents);
            requestUrl.searchParams.append("reference", reference);
            requestUrl.searchParams.append("sku", carnetInfo.link);
            requestUrl.searchParams.append("signature:integrity", integrity as string);
            requestUrl.searchParams.append("redirect-url", `${PUBLIC_PAGE_URL}/compra`);
            requestUrl.searchParams.append("collect-customer-legal-id", "true");
            requestUrl.searchParams.append("customer-data:email", email || "");
            requestUrl.searchParams.append("customer-data:full-name", name || "");
            requestUrl.searchParams.append("customer-data:phone-number", phone_number || "");
            redirectUrl = requestUrl;
        } else {
            // Person is foreigner
            const client = new paypal.Client({
                environment: (PAYPAL_MODE === "production") ? paypal.Environment.Production : paypal.Environment.Sandbox,
                clientCredentialsAuthCredentials: {
                    oAuthClientId: PAYPAL_CLIENT_ID,
                    oAuthClientSecret: PAYPAL_SECRET
                }
            });

            const orderController = new paypal.OrdersController(client);
            const order = await orderController.createOrder({
                body: {
                    intent: paypal.CheckoutPaymentIntent.Capture,
                    purchaseUnits: [{
                        invoiceId: reference,
                        amount: { currencyCode: "USD", value: carnetInfo.price_in_usd },
                        description: `Compra del carnet ${carnetInfo.title}`,
                    }]
                }
            });

            let requestUrl = order.result.links?.find(link => link.rel === "approve")?.href;
            if (!requestUrl) return fail(500, { message: "Unable to get a payment link from PayPal." });
            redirectUrl = requestUrl!;
        };

        // Write the user metadata into db.
        const metadata = {
            user: { name, email, university, address, phone_number, whatsapp },
            emergency_contact: { name: emergency_name, phone_number: emergency_phone },
            health: { sex, blood: { abo: blood_type, rh_factor }, feeding, health },
            carnet: { id: carnet_id, price: carnetInfo.price_in_cents }
        };
        const redis = await createClient({ url: REDIS_URL }).connect();
        await redis.hSet(pre + "custom-data-list", reference, JSON.stringify(metadata)).catch((_) => fail(500, { message: "Unable to write into db." }));
        return redirect(303, redirectUrl);
    }
};