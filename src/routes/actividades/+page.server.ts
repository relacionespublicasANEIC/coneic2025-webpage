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
        let number = formData.get("buy");

        if (!number) {
            return fail(400, { message: "No number" });
        };



        const redis = await createClient({ url: REDIS_URL }).connect().catch((_) => error(500, "Unable to connect to db."));
        // try to get by transaction number
        let info;
        try {
            let a = await redis.hGet(pre + "custom-data-list", number!.toString());
            info = JSON.parse(a!);
        } catch {
            return fail(400, {});
        };

        return {
            reference: number!.toString(),
            name: info!.user.name,
            email: info.user.email,
            university: info.user.university,
            hasArl: true
        };
    }
}