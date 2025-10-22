<script lang="ts">
    import MetadataDialog from "$lib/components/metadata-dialog.svelte";
    import PciCompliant from "$lib/icons/pci-compliant.svelte";
    import badges from "$lib/data/badges.json";
    
    let showPriceInUsd = $state(false);
    let dialogReference: MetadataDialog;
    let currCarnetId = $state("");
</script>

<section class="p-8">
    <div class="flex items-center pb-4">
        <input
            id="usd-price"
            type="checkbox"
            bind:checked={showPriceInUsd}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label for="usd-price" class="ms-2 text-sm">Mostrar precios en dólares.</label>
    </div>
    <main
        id="carnets"
        class="space-y-4 has-target:space-y-12 md:space-y-0 md:grid grid-cols-3 gap-6 justify-items-center justify-between align-middle">
        {#each badges as badge}
            <article
                id={badge.link}
                class="w-full flex flex-col rounded-md p-6 {badge.color} text-white shadow-md target:scale-110 target:shadow-2xl">
                <div class="text-center">
                    <h3 class="text-2xl">Carnet</h3>
                    <h3 class="text-4xl">{badge.title}</h3>
                </div>
                <div class="relative flex py-4">
                    {#if showPriceInUsd}
                        <span class="absolute text-xl"></span>
                        <p class="text-8xl text-center grow">{badge.price_in_usd}</p>
                        <span class="absolute text-xl bottom-4 right-0">USD</span>
                    {:else}
                        <span class="absolute text-xl">COP$</span>
                        <p class="text-8xl text-center grow">{badge.price[2]}</p>
                        <span class="absolute text-xl bottom-4 right-0">mil</span>
                    {/if}
                </div>

                <ul class="list-disc list-inside grow">
                    {#each badge.features as feat}
                        <li>{feat}</li>
                    {/each}
                </ul>

                <button
                    class="text-2xl mt-4 border-2 p-2 rounded-md text-center cursor-pointer"
                    onclick={() => {
                        currCarnetId = badge.link;
                        dialogReference.toggle();
                    }}>
                    Comprar
                </button>
            </article>
        {/each}
    </main>
    <article>
        <a class="flex items-center" href="https://wompi.com/es/co/">
            <div>
                <p class="text-sm align-middle">Pagos dentro de Colombia con la tecnología de</p>
            </div>
            <div class="w-24">
                <PciCompliant />
            </div>
        </a>
        <a class="flex items-center" href="https://www.paypal.com/">
            <p class="text-sm align-middle">Pagos internacionales con la tecnología de</p>
            <div class="w-24 px-4">
                <img src="/paypal.png" alt="Pago seguro con PayPal" />
            </div>
        </a>
    </article>
</section>

<MetadataDialog carnet_id={currCarnetId} bind:this={dialogReference} />