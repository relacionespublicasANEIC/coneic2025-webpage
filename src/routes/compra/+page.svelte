<script lang="ts">
    import "../../styles.css";
    import type { PageProps } from "./$types";
    import Bill from "$lib/icons/bill.svelte";

    let { data }: PageProps = $props();

    const fillColor: { [key: string]: string } = {
        PENDING: "fill-gray-500",
        DECLINED: "fill-red-600",
        ERROR: "fill-red-600",
        VOIDED: "fill-gray-500",
        APPROVED: "fill-green-500",
        COMPLETED: "fill-green-500",
    };

    const statusTitle: { [key: string]: string } = {
        PENDING: "pendiente",
        DECLINED: "fallida",
        ERROR: "fallida",
        VOIDED: "cancelada",
        APPROVED: "completada",
        COMPLETED: "completada",
    };

    const messageInfo: { [key: string]: string } = {
        PENDING: "Estamos esperando aún que la transacción se complete.",
        DECLINED: data.status_message + ".",
        ERROR: data.status_message + ".",
        VOIDED: "La transacción fue cancelada.",
        APPROVED: "A tu correo te llegará la confirmación de tu compra.",
        COMPLETED: "A tu correo te llegará la confirmación de tu compra.",
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

        {#if data.status === "APPROVED" || data.status === "COMPLETED"}
            <p>Identificador de compra</p>
            <p class="text-xl">{data.id}</p>
            <br />
            <p class="text-xs">Guarda este identificador de pago en un lugar seguro.</p>
            <br />
        {/if}

        <a class="bg-barranquilla-green text-white p-2 rounded-md" href="/"
            >Vuelve a la página principal</a>
    </section>
</section>
