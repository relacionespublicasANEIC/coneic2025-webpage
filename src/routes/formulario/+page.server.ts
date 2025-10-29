import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from "$env/static/private";
import { PUBLIC_KEY_WOMPI, PUBLIC_PAGE_URL } from "$env/static/public";
import { INTEGRITY_KEY_WOMPI, VERCEL_ENV } from "$env/static/private";
import { redirect, fail } from "@sveltejs/kit";
import { createClient } from "redis";
import type { Actions } from "./$types";
import { randomUUID } from "crypto";
import paypal from "@paypal/paypal-server-sdk";
import badges from "$lib/data/badges.json";

// Creates a integrity signature for a wompi transaction.
// https://docs.wompi.co/docs/colombia/widget-checkout-web
async function createIntegritySignature(reference: string, amount: string): Promise<string> {
    const string = `${reference}${amount}COP${INTEGRITY_KEY_WOMPI}`;
    const encondedText = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const actions: Actions = {
    async default({ request }) {
        const data = Object.fromEntries(await request.formData());

        // Check all mandatory fields exist.
        if (!data.name || !data.email) return fail(400, { message: "Form did not included name nor email." });

        // Get carnet info with the id.
        if (!data.carnet_id) return fail(400, { message: "Form did not included carnet's id." });
        const carnetInfo = badges.find(i => i.link === data.carnet_id);
        if (!carnetInfo) return fail(400, { message: "Carnet was not found by its id." });

        // Choose the payment provider.
        let redirectUrl: URL | string;
        const reference = `carnet${carnetInfo.link}-${randomUUID()}`;
        if (data.colombian) {
            // Create a wompi transaction url.
            // https://docs.wompi.co/docs/colombia/widget-checkout-web/#web-checkout
            const integrity = await createIntegritySignature(reference, carnetInfo.price_in_cents);
            const requestUrl = new URL("https://example.com/p/");
            requestUrl.searchParams.append("public-key", PUBLIC_KEY_WOMPI);
            requestUrl.searchParams.append("currency", "COP");
            requestUrl.searchParams.append("amount-in-cents", carnetInfo.price_in_cents);
            requestUrl.searchParams.append("reference", reference);
            requestUrl.searchParams.append("sku", carnetInfo.link);
            requestUrl.searchParams.append("signature:integrity", integrity as string);
            requestUrl.searchParams.append("redirect-url", `${PUBLIC_PAGE_URL}/compra`);
            requestUrl.searchParams.append("collect-customer-legal-id", "true");
            requestUrl.searchParams.append("customer-data:email", data.email.toString() || "");
            requestUrl.searchParams.append("customer-data:full-name", data.name.toString() || "");
            requestUrl.searchParams.append("customer-data:phone-number", data.phone_number.toString() || "");
            redirectUrl = requestUrl;
        } else {
            // Create an paypal order.
            // https://developer.paypal.com/serversdk/typescript/api-endpoints/orders/create-order
            const client = new paypal.Client({
                environment: (VERCEL_ENV === "production") ? paypal.Environment.Production : paypal.Environment.Sandbox,
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
                    }],
                    applicationContext: {
                        brandName: "ANEIC Colombia",
                        shippingPreference: paypal.OrderApplicationContextShippingPreference.NoShipping,
                        returnUrl: `${PUBLIC_PAGE_URL}/compra`,
                        cancelUrl: `${PUBLIC_PAGE_URL}/compra`
                    }
                }
            });

            let requestUrl = order.result.links?.find(link => link.rel === "approve")?.href;
            if (!requestUrl) return fail(500, { message: "Unable to get a payment link from PayPal." });
            redirectUrl = requestUrl!;
        };

        // Write user data into database.
        const { name, email, university, address, country, phone_number, whatsapp } = data;
        const { emergency_name, emergency_phone } = data;
        const { blood_type, rh_factor, sex, feeding, health } = data;
        const metadata = {
            user: {
                name,
                email,
                university,
                address,
                country,
                phone_number,
                whatsapp: !!whatsapp
            },
            emergency_contact: {
                emergency_name,
                emergency_phone
            },
            health_description: {
                blood: `${blood_type}${rh_factor}`,
                sex, feeding, health
            },
            carnet: {
                id: carnetInfo.link,
                name: carnetInfo.title,
                prices: [carnetInfo.price_in_cents, carnetInfo.price_in_usd]
            }
        };
        const redis = await createClient({ url: REDIS_URL }).connect();
        await redis.hSet(pre + "custom-data-list", reference, JSON.stringify(metadata)).catch((_) => fail(500, { message: "Unable to write into db." }));
        return redirect(303, redirectUrl);
    }
};