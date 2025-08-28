<script lang="ts">
    import "../../styles.css";
    import type { PageProps } from "./$types";
    import Bill from "../../icons/bill.svelte";
    import badges from "../../data/badges.json";

    let { data }: PageProps = $props();

    const fillColor: { [key: string]: string } = {
        PENDING: "fill-gray-500",
        DECLINED: "fill-red-600",
        ERROR: "fill-red-600",
        VOIDED: "fill-gray-500",
        APPROVED: "fill-green-500",
    };

    const statusTitle: { [key: string]: string } = {
        PENDING: "pendiente",
        DECLINED: "fallida",
        ERROR: "fallida",
        VOIDED: "cancelada",
        APPROVED: "completada",
    };

    const messageInfo: { [key: string]: string } = {
        PENDING: "Estamos esperando aún que la transacción se complete.",
        DECLINED: data.status_message + ".",
        ERROR: data.status_message + ".",
        VOIDED: "La transacción fue cancelada.",
        APPROVED: "A tu correo te llegará la confirmación de tu compra.",
    };
</script>

<svelte:head>
    <title>CONEIC 2025 | Resultado de compra online de carnet</title>
</svelte:head>

<section class="p-8">
    <section>
        <div class="w-8 {fillColor[data.status]}">
            <Bill />
        </div>

        <h1 class="text-xl">Transacción {statusTitle[data.status]}</h1>
        <h2>{messageInfo[data.status]}</h2>
        <br />

        {#if data.status === "APPROVED"}
            <p>Identificador de compra</p>
            <p class="text-xl">{data.id}</p>

            <p>Carnet</p>
            <p class="text-xl">
                {badges.find((i) => i.payment === data.payment_link_id)?.title}
            </p>
        {/if}
    </section>
</section>
