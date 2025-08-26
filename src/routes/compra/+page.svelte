<script lang="ts">
    import "../../styles.css";
    import qrcode from "qrcode-generator";
    import badges from "../../data/badges.json";

    export let data;

    function createQr(data: string): string {
        let qr = qrcode(0, "M");
        qr.addData(data);
        qr.make();
        return qr.createDataURL(10, 0);
    }

    function getBadge(paymentId: string): [string, string] {
        if (paymentId === "" || paymentId === undefined) {
            return ["", ""];
        }

        let bagde_json = badges.find((i) => i.payment === paymentId)!;
        return [bagde_json.title, bagde_json.color];
    }

    let customer = data?.message?.trasanction?.customer_data;
    let qr_data = [data?.message?.hash, customer?.full_name, customer?.legal_id];
    let qr_url = createQr(qr_data.join("|"));
    let bagde_info = getBadge(data?.message?.trasanction?.payment_link_id);
</script>

<section class="mt-6">
    {#if data.status !== "APPROVED"}
        <section
            class="w-1/2 max-w-3/4 p-8 m-auto flex flex-col border-2 border-barranquilla-red rounded-md">
            <h1 class="text-6xl text-center text-barranquilla-red">TRANSACCIÓN {data.title}</h1>
            <div class="mt-4">
                <p class="text-2xl text-center">¿Qué pasó?</p>
                <h2 class="text-4xl text-center">{data.message}</h2>
            </div>
            <div class="flex justify-center mt-6">
                <a class="border-2 p-2 rounded-md bg-barranquilla-red" href="/#carnets"
                    >Vuelve a la página inicial para intertarlo de nuevo</a>
            </div>
        </section>
    {:else}
        <section class="w-full mt-12">
            <section class="print:w-3/4 w-1/4 m-auto p-8 rounded-md {bagde_info[1]} aspect-17/22">
                <section class="bg-white rounded-md p-4 h-full flex flex-col">
                    <div class="grow">
                        <div>
                            <p>Nombre</p>
                            <p class="text-3xl">{customer.full_name}</p>
                        </div>
                        <div>
                            <p>Documento</p>
                            <p class="text-3xl">
                                {customer.legal_id_type + " " + customer.legal_id}
                            </p>
                        </div>

                        <p>Universidad</p>
                        <p class="text-3xl">{customer.customer_references[0].value}</p>
                    </div>
                    <div>
                        <img class="block w-1/2 m-auto" src={qr_url} alt="QR Code" />
                        <p class="text-center">{bagde_info[0]}</p>
                    </div>
                </section>
            </section>

            <p class="text-center mt-10 print:hidden">
                Tómale una foto a tu carnet o <button
                    onclick={() => window.print()}
                    class="{bagde_info[1]} text-white p-1 cursor-pointer">guardalo en PDF</button>
            </p>
        </section>
    {/if}
</section>
