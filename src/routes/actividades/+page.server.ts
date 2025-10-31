import type { Actions } from './$types';
import { REDIS_URL, REDIS_DB_PREFIX as pre } from "$env/static/private";
import { error, json, fail, redirect } from "@sveltejs/kit";
import { createClient } from "redis";

export const actions: Actions = {
    append_user: async ({ request }) => {

        let formData = await request.formData();
        let ref = formData.get("reference");
        let taller = formData.get("workshop");
        let salida = formData.get("field_trip");

        if (!ref || !taller || !salida) {
            return fail(400, {});
        }

        console.log(ref.toString(), taller.toString(), salida.toString());

        redirect(300, "https://example.com");
        // check if there is space, then add to list.
        // if user is already in the list, fuck them
    },
    find_user: async ({ request }) => {
        let formData = await request.formData();
        let email_reference = formData.get("buy");

        if (!email_reference) {
            return fail(400, { message: "No number" });
        };

        const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));

        // we will search for the email in the list
        let info;
        let ref;
        let pre2 = pre;
        try {
            // first, we'll look for email position
            let rr = await redis.lPos(pre2 + "emailed-id-list", email_reference.toString());
            if (!rr) throw "";

            // luego, we'll look for transaction number, relative to email.
            let transaction_number = await redis.lIndex(pre2 + "emailed-id-list", rr + 1);
            if (!transaction_number) throw "";

            // with email, we'll search transaction information
            let transaction_info = await redis.hGet(pre2 + "transaction-data-list", transaction_number);
            if (!transaction_info) throw "";
            let d = JSON.parse(transaction_info);

            // then we'll transaction reference
            let transaction_ref: string = (d?.invoice_id || d?.reference);
            if (!transaction_ref) throw "";

            // with reference, we'll get client info
            let user_info = await redis.hGet(pre2 + "custom-data-list", transaction_ref);
            if (!user_info) throw "";
            let user_info_live = JSON.parse(user_info);
            info = user_info_live;
            ref = transaction_ref;

        } catch (e) {
            console.error("algo falló");
            fail(400);
        }


        return {
            reference: ref,
            name: info.user.name,
            email: info.user.email,
            university: info.user.university,
            hasArl: false
        };
    }
}