<script lang="ts">
    import "./../../styles.css";
    import type { PageProps } from "./$types";

    let { form, data }: PageProps = $props();

    const workshops = [
        {
            id: "ptar",
            name: "Funcionamiento de una PTAR",
            hour: "8:30 a.m.",
        },
        {
            id: "euskadi",
            name: "Taller con Euskadi",
            hour: "2:30 p.m.",
        },
        {
            id: "python",
            name: "Fundamentos de programación en Python",
            hour: "2:30 p.m.",
        },
    ];

    const field_trips = [
        {
            id: "mallorquin",
            name: "Cienága de Mallorquín",
            exit_point: "Universidad del Norte",
            hour: "7:30 a.m.",
            arl_mandatory: false,
        },
        {
            id: "palermo",
            name: "Puerto de Palermo",
            exit_point: "Hotel Windsor",
            hour: "7:30 a.m.",
            arl_mandatory: true,
        },
        {
            id: "argos1",
            name: "Planta concretera de Argos",
            exit_point: "Universidad del Norte",
            hour: "7:30 a.m.",
            arl_mandatory: true,
        },
        {
            id: "argos2",
            name: "Planta concretera de Argos",
            exit_point: "Universidad del Norte",
            hour: "9:30 a.m.",
            arl_mandatory: true,
        },
        {
            id: "acero",
            name: "Planta de Polyuprotec",
            exit_point: "Hotel Windsor",
            hour: "7:30 a.m.",
            arl_mandatory: true,
        },
    ];
</script>

<section class="p-6 flex gap-6 bg-gray-50 font-sans text-gray-800">
    <section
        class="w-1/4 p-4 bg-white rounded-lg space-y-4 flex flex-col h-fit border border-gray-200">
        <form method="get" class="space-y-3">
            <h2 class="text-lg font-semibold border-b pb-1 border-gray-300">
                Validación de compra
            </h2>
            <div class="space-y-1">
                <label for="email" class="block text-xs font-medium text-gray-700"
                    >Ingresa el correo al que llegó tu carné</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    required />
            </div>
            <button
                type="submit"
                class="w-full bg-gray-700 text-white py-1.5 rounded-sm text-sm hover:bg-gray-800 transition duration-150 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1">
                Validar
            </button>
        </form>

        <!-- {JSON.stringify(data)} -->

        {#if !data.void}
            <article
                class="text-center space-y-2 grow flex flex-col align-middle justify-center border-t pt-3 mt-3 border-gray-200">
                <div class="p-1 bg-gray-50 rounded-sm">
                    <h3 class="text-xs font-medium text-gray-600">Nombre</h3>
                    <p class="text-sm font-semibold">{data.name}</p>
                </div>

                <div class="p-1 bg-gray-50 rounded-sm">
                    <h3 class="text-xs font-medium text-gray-600">Correo</h3>
                    <p class="text-sm font-semibold">{data.email}</p>
                </div>

                <div class="p-1 bg-gray-50 rounded-sm">
                    <h3 class="text-xs font-medium text-gray-600">Universidad</h3>
                    <p class="text-sm font-semibold">{data.university}</p>
                </div>

                {#if !data.hasArl}
                    <p
                        class="text-xs p-2 bg-yellow-50 text-yellow-800 rounded-sm mt-3 border border-yellow-200">
                        No recibimos información de ARL de tu universidad, por lo que no podrás
                        escoger algunas salidas académicas.
                    </p>
                {/if}
            </article>
        {/if}
    </section>

    <form
        method="post"
        class="w-3/4 p-4 bg-white rounded-lg space-y-4 border peer border-gray-200 {data.void
            ? 'bg-gray-100 opacity-60 pointer-events-none'
            : ''} ">
        <input type="text" name="reference" value={data.reference} hidden />

        <main class="space-y-3">
            <div class="border-b pb-0.5 border-gray-300">
                <h2 class="text-xl font-bold">Taller</h2>
                <h3 class="text-sm text-gray-700 mt-0.5">Jueves, 6 de noviembre de 2025</h3>
            </div>

            <div class="grid grid-cols-3 gap-3">
                {#each workshops as work}
                    <div class="flex h-full w-full">
                        <input
                            class="hidden peer"
                            type="radio"
                            required
                            id={work.id}
                            name="workshop"
                            disabled={data.void}
                            value={work.id} />
                        <label
                            for={work.id}
                            class="block w-full cursor-pointer p-3 border border-gray-300 rounded-sm transition duration-150 ease-in-out
                                   peer-checked:bg-white peer-checked:text-gray-800 peer-checked:border-gray-800 peer-checked:ring-2 peer-checked:ring-gray-800
                                   hover:border-gray-500 hover:bg-gray-50
                                   peer-disabled:bg-gray-100 peer-disabled:text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:hover:border-gray-300 peer-disabled:hover:bg-gray-100">
                            <h3 class="text-base font-semibold">{work.name}</h3>
                            <p class="text-xs mt-1 text-gray-700 peer-checked:text-gray-700">
                                {work.hour}
                            </p>
                        </label>
                    </div>
                {/each}
            </div>
        </main>

        <!-- <main class="space-y-3">
            <div class="border-b pb-0.5 border-gray-300">
                <h2 class="text-xl font-bold">Salida académica</h2>
                <h3 class="text-sm text-gray-700 mt-0.5">Viernes, 7 de noviembre de 2025</h3>
            </div>

            <div class="grid grid-cols-3 gap-3">
                {#each field_trips as trip}
                    <div class="flex h-full w-full">
                        <input
                            class="hidden peer"
                            type="radio"
                            required
                            id={trip.id}
                            name="field_trip"
                            disabled={trip.arl_mandatory && !data.hasArl}
                            value={trip.id} />
                        <label
                            for={trip.id}
                            class="block w-full cursor-pointer p-3 border border-gray-300 rounded-sm transition duration-150 ease-in-out
                                   peer-checked:bg-white peer-checked:text-gray-800 peer-checked:border-gray-800 peer-checked:ring-2 peer-checked:ring-gray-800
                                   hover:border-gray-500 hover:bg-gray-50
                                   peer-disabled:bg-gray-100 peer-disabled:text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:hover:border-gray-300 peer-disabled:hover:bg-gray-100">
                            <h3 class="text-base font-semibold">{trip.name}</h3>

                            <p class="text-xs mt-2 text-gray-700 peer-checked:text-gray-700">
                                {trip.exit_point} - {trip.hour}
                            </p>

                            {#if !data.void}
                                {#if trip.arl_mandatory && !data.hasArl}
                                    <p class="text-xs mt-1 font-medium text-red-600">
                                        ¡Requiere ARL!
                                    </p>
                                {/if}
                            {/if}
                        </label>
                    </div>
                {/each}
            </div>
        </main> -->

        <main class="border-t pt-3 mt-3 border-gray-200">
            {#if !data.void}
                <button
                    type="submit"
                    class="w-full bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-900 transition duration-150 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1">
                    Enviar
                </button>
            {/if}

            {#if form?.complete}
                <p>{form?.message}</p>
            {/if}
        </main>
    </form>
</section>
