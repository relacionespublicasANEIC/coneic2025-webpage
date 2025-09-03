<script lang="ts" module>
    let open = $state(false);
    export const toggleStatus = () => (open = !open);
</script>

<script lang="ts">
    import badges from "$lib/data/badges.json";
    let { carnet_id }: { carnet_id: string } = $props();
    let badge = $derived(badges.find((i) => i.link === carnet_id)!);
    let isColombian = $state(true);
    let node: HTMLDialogElement;
    export const toggle = () => (node.open ? node.close() : node.showModal());
</script>

<dialog bind:this={node} class="mx-auto max-h-4/5 max-w-3/4 w-3/4 md:mt-8 backdrop:bg-black/50">
    <section class="p-8">
        <div class="mb-4">
            <h1 class="text-2xl">Compra de carnet {badge?.title}</h1>
            <h2 class="text-xl">Formulario de registro</h2>
            <p>
                Estamos emocionados por tus ganas de asistir al evento. Necesitamos los siguientes
                datos para empezar con el proceso.
            </p>
        </div>

        <form method="POST" class="space-y-4">
            <input type="hidden" name="carnet_id" value={carnet_id} />

            <fieldset>
                <legend class="pb-4">Datos de contacto</legend>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="name"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="name"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Nombre completo</label>
                    <p class="text-xs">
                        Este será el nombre que aparecerá en el carnet y en el certificado.
                    </p>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="email"
                        name="email"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="email"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Correo electrónico</label>
                    <p class="text-xs">A este correo te llegará la confirmación de la compra.</p>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="university"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="university"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Universidad o institución</label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="address"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="address"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Ciudad, provincia y país</label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="tel"
                        name="phone_number"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="phone_number"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Número de teléfono</label>
                </div>

                <div class="flex items-center mb-4">
                    <input
                        name="whatsapp"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label
                        for="whatsapp"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >¿Te podemos contactar por WhatsApp a través de ese número?</label>
                </div>
                <div class="flex flex-col mb-4">
                    <div class="flex items-center">
                        <input
                            name="colombian"
                            type="checkbox"
                            bind:checked={isColombian}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label
                            for="whatsapp"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >¿Es usted colombiano?</label>
                    </div>
                    {#if !isColombian}
                        <p class="grow-1 text-xs">
                            Los pagos para extranjeros se harán a través de PayPal.
                        </p>
                    {/if}
                </div>
            </fieldset>

            {#if carnet_id === "puerta-oro"}
                <fieldset>
                    <legend class="pb-2">Sexo biólogico</legend>
                    <section class="flex space-x-2">
                        <div class="flex items-center me-4">
                            <input
                                id="male"
                                value="male"
                                required
                                type="radio"
                                name="sex"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="male"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >Hombre</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input
                                id="female"
                                value="female"
                                required
                                type="radio"
                                name="sex"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="female"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >Mujer</label>
                        </div>
                    </section>
                    <p class="text-xs">Con este dato distribuiremos las habitaciones.</p>
                </fieldset>
            {/if}

            <fieldset>
                <legend class="pb-2">Tipo de sangre</legend>
                <article>
                    <section class="abo-factor flex">
                        <div class="flex items-center me-4">
                            <input
                                id="bloodA"
                                value="A"
                                required
                                type="radio"
                                name="blood_type"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="bloodA"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >A</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input
                                id="bloodB"
                                value="B"
                                required
                                type="radio"
                                name="blood_type"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="bloodB"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >B</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input
                                id="bloodAB"
                                value="AB"
                                required
                                type="radio"
                                name="blood_type"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="bloodAB"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >AB</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input
                                id="bloodO"
                                value="O"
                                required
                                type="radio"
                                name="blood_type"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="bloodO"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >O</label>
                        </div>
                    </section>
                    <section class="rh-factor flex">
                        <div class="flex items-center me-4">
                            <input
                                id="plus"
                                value="+"
                                type="radio"
                                required
                                name="rh_factor"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="plus"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >+</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input
                                id="minus"
                                value="-"
                                required
                                type="radio"
                                name="rh_factor"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label
                                for="minus"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >-</label>
                        </div>
                    </section>
                </article>
            </fieldset>

            <fieldset>
                <legend class="pb-2">Contacto de emergencia</legend>
                <article>
                    <div class="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="emergency_name"
                            class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                            required />
                        <label
                            for="emergency_name"
                            class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Nombre</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input
                            type="tel"
                            name="emergency_phone"
                            class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                            required />
                        <label
                            for="emergency_phone"
                            class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Teléfono</label>
                    </div>
                </article>
            </fieldset>

            <fieldset>
                <legend class="pb-4">Información de salud</legend>
                <div class="relative z-0 w-full mb-6 group">
                    <textarea
                        name="feeding"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required></textarea>
                    <label
                        for="feeding"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Describenos si tiene alguna restricción alimentaria</label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <textarea
                        name="health"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required></textarea>
                    <label
                        for="health"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Describenos si tiene alguna restricción de salud</label>
                </div>
            </fieldset>

            <button class="bg-blue-600 text-white p-2 rounded-md" type="submit">
                Ir a {isColombian ? "Wompi" : "PayPal"}
            </button>
            <button class="bg-red-600 text-white p-2 rounded-md" onclick={() => node.close()}>
                Cancelar
            </button>
        </form>
    </section>
</dialog>
