<script lang="ts">
    import "./../../styles.css";
    import type { PageProps } from "./$types";

    let { form }: PageProps = $props();

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

<section class="p-4 flex gap-4">
    <section class="w-1/4 p-4 border-2 rounded-md space-y-2 flex flex-col">
        <form method="post" action="?/find_user" class="space-y-2">
            <label for="buy">Ingresa el número de tu compra que aparece en el carné</label>
            <input type="text" id="buy" name="buy" class="border-2 w-full" required />
            <button type="submit" class="border-2 px-2">Validar</button>
        </form>

        {#if form}
            <article class="text-center space-y-2 grow flex flex-col align-middle justify-center">
                <div>
                    <h3>Nombre</h3>
                    <p>{form.name}</p>
                </div>

                <div>
                    <h3>Correo</h3>
                    <p>{form.email}</p>
                </div>

                <div>
                    <h3>Universidad</h3>
                    <p>{form.university}</p>
                </div>

                {#if !form.hasArl}
                    <p class="text-xs">
                        No recibimos información de ARL de tu universidad, por lo que no podrás
                        escoger algunas salidas académicas.
                    </p>
                {/if}
            </article>
        {/if}
    </section>

    <form
        action="?/append_user"
        method="post"
        class="w-3/4 p-4 border-2 rounded-md space-y-2 {form ? '' : 'bg-amber-200'} ">
        <input type="text" name="reference" id={form?.reference} hidden />

        <main class="space-y-2">
            <div>
                <h2 class="text-2xl">Taller</h2>
                <h3 class="text-md">Jueves, 6 de noviembre de 2025</h3>
            </div>
            <div class="grid grid-cols-3 gap-2">
                {#each workshops as work}
                    <div class="flex h-full w-full">
                        <input
                            class="hidden peer"
                            type="radio"
                            required
                            id={work.id}
                            name="workshop"
                            disabled={!form}
                            value={work.id} />
                        <label
                            for={work.id}
                            class="border-2 rounded-md p-2 peer-checked:bg-amber-200 w-full peer-disabled:bg-red-400">
                            <h3 class="text-xl">{work.name}</h3>
                            <p>{work.hour}</p>
                        </label>
                    </div>
                {/each}
            </div>
        </main>

        <main class="space-y-2">
            <div>
                <h2 class="text-2xl">Salida académica</h2>
                <h3 class="text-md">Viernes, 7 de noviembre de 2025</h3>
            </div>
            <div class="grid grid-cols-3 gap-2">
                {#each field_trips as trip}
                    <div class="flex h-full w-full">
                        <input
                            class="hidden peer"
                            type="radio"
                            required
                            id={trip.id}
                            name="field_trip"
                            disabled={!form || (trip.arl_mandatory && !form.hasArl)}
                            value={trip.id} />
                        <label
                            for={trip.id}
                            class="border-2 rounded-md p-2 peer-checked:bg-amber-200 w-full peer-disabled:bg-red-400">
                            <h3 class="text-xl">{trip.name}</h3>

                            <p class="text-xs">
                                Salimos de {trip.exit_point} a las {trip.hour}
                            </p>
                        </label>
                    </div>
                {/each}
            </div>
        </main>
        <main>
            {#if form}
                <button type="submit" class="px-2 border-2">Enviar</button>
            {/if}
        </main>
    </form>
</section>
