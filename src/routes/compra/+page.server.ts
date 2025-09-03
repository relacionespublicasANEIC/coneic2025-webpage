import { error } from "@sveltejs/kit";
import type { PageLoadServer } from "./$types";
import { PUBLIC_WOMPI_ENDPOINT } from "$env/static/public";
import { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET } from "$env/static/private";
import paypal from "@paypal/paypal-server-sdk";

export const load: PageLoadServer = async ({ url, fetch }) => {
    let id = url.searchParams.get("id");
    let token = url.searchParams.get("token");

    if (id) {
        // Get transaction from wompi endpoint
        let requestUrl = `${PUBLIC_WOMPI_ENDPOINT}/v1/transactions/${id}`;
        let res = await fetch(requestUrl).catch((_) => error(500, "Unable to fetch transaction info"));
        if (!res.ok) return error(500, "Unable to fetch transaction info");
        if (res.status !== 200) return error(500, "Unable to fetch transaction info");
        let body = await res.json().catch((_) => error(500, "Unable to fetch transaction info"));
        if (!body?.data?.id || body?.data?.id !== id) error(500, "Unable to fetch transaction info");
        return { ...body.data };
    };

    if (token) {
        // Get an paypal order by its token.
        // https://developer.paypal.com/serversdk/typescript/api-endpoints/orders/get-order
        const client = new paypal.Client({
            environment: (PAYPAL_MODE === "production") ? paypal.Environment.Production : paypal.Environment.Sandbox,
            clientCredentialsAuthCredentials: {
                oAuthClientId: PAYPAL_CLIENT_ID,
                oAuthClientSecret: PAYPAL_SECRET
            }
        });

        const orderController = new paypal.OrdersController(client);
        const { body } = await orderController.getOrder({ id: token });
        const live = JSON.parse(body as string);
        return {
            id: live.purchase_units[0].invoice_id,
            status: live.status === "APPROVED" ? "PENDING" : live.status,
            status_message: "Hubo un error mientras se hacia la transacción." //This message only will be shown if transaction is failed.
        }
    };

    throw error(400, "There's no way to identify the transaction.");
};