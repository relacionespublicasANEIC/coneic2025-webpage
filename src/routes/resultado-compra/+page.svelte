<script lang="ts">
    export let data;
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
                <a
                    class="border-2 p-2 rounded-md border-barranquilla-yellow bg-barranquilla-yellow"
                    href="/#carnets">Vuelve a la página inicial para intertarlo de nuevo</a>
            </div>
        </section>
    {:else}
        <section class="w-full h-full">
            {JSON.stringify(data)};
            <section class="">
                <div>
                    <p>Carnet</p>
                    <p>qr</p>
                </div>
                <div>
                    <p>Nombre</p>
                    <p>Email</p>
                    <p>Universidad</p>

                    <hr />
                    <p>Correo</p>
                    <p>reference</p>
                </div>
            </section>
        </section>
    {/if}
</section>
