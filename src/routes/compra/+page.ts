import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { PUBLIC_WOMPI_ENDPOINT } from "$env/static/public";

export const load: PageLoad = async ({ url, fetch }) => {
    let id = url.searchParams.get("id");
    if (!id || id === "") return error(400, "Request does not have an id.");

    // Get transaction from wompi endpoint
    let requestUrl = `${PUBLIC_WOMPI_ENDPOINT}/v1/transactions/${id}`;
    let res = await fetch(requestUrl).catch((_) => error(500, "Unable to fetch transaction info"));
    if (!res.ok) return error(500, "Unable to fetch transaction info");
    if (res.status !== 200) return error(500, "Unable to fetch transaction info");
    let body = await res.json().catch((_) => error(500, "Unable to fetch transaction info"));
    if (!body?.data?.id || body?.data?.id !== id) error(500, "Unable to fetch transaction info");
    return { ...body.data };
};