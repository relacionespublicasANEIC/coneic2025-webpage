<script lang="ts" module>
    let open = $state(false);
    export const toggleStatus = () => (open = !open);
</script>

<script lang="ts">
    import badges from "$lib/data/badges.json";
    let { carnet_id }: { carnet_id: string } = $props();
    let badge = $derived(badges.find((i) => i.link === carnet_id)!);
    let selectedCountry = $state("Colombia");
    let isColombian = $derived(selectedCountry === "Colombia");
    let node: HTMLDialogElement;
    export const toggle = () => (node.open ? node.close() : node.showModal());
</script>

<dialog bind:this={node} class="rounded-md m-auto h-9/10 md:w-3/4 w-9/10 backdrop:bg-black/50">
    <section class="p-8">
        <header class="mb-4">
            <h2 class="text-3xl text-center">Formulario de registro</h2>
        </header>

        <form method="POST" class="space-y-4">
            <input type="hidden" name="carnet_id" value={carnet_id} />
            <input type="hidden" name="colombian" value={isColombian ? "on" : undefined} />

            <fieldset>
                <legend class="text-xl pb-4">Datos de contacto</legend>
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
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
                        id="email"
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
                        id="university"
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
                        id="address"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="address"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Ciudad, estado o departamento</label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <label for="country" class="block text-sm">País de origen</label>
                    <select
                        id="country"
                        name="country"
                        required
                        bind:value={selectedCountry}
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer text-sm">
                        <optgroup label="América del Sur">
                            <option value="Argentina"> Argentina</option>
                            <option value="Bolivia"> Bolivia</option>
                            <option value="Chile"> Chile</option>
                            <option selected value="Colombia"> Colombia</option>
                            <option value="Ecuador"> Ecuador</option>
                            <option value="Paraguay"> Paraguay</option>
                            <option value="Perú">Perú</option>
                            <option value="Uruguay"> Uruguay</option>
                            <option value="Venezuela"> Venezuela</option>
                        </optgroup>
                        <optgroup label="América del Centro">
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Guatemala"> Guatemala</option>
                            <option value="Honduras"> Honduras</option>
                            <option value="Nicaragua"> Nicaragua</option>
                            <option value="Panamá"> Panamá</option>
                        </optgroup>
                        <optgroup label="América del Norte">
                            <option value="México"> México</option>
                            <option value="Estados Unidos">Estados Unidos</option>
                        </optgroup>
                    </select>

                    {#if isColombian}
                        <p class="grow-1 text-xs">Podrás pagar por Nequi y PSE.</p>
                    {:else}
                        <p class="grow-1 text-xs">
                            Los pagos de extranjeros se harán a través de PayPal.
                        </p>
                    {/if}
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="tel"
                        name="phone_number"
                        id="phone_number"
                        class="block py-2 px-0 w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required />
                    <label
                        for="phone_number"
                        class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Número de teléfono con indicativo</label>
                </div>

                <div class="flex items-center mb-4">
                    <input
                        name="whatsapp"
                        id="whatsapp"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
                    <label for="whatsapp" class="ms-2 text-sm"
                        >¿Te podemos contactar por WhatsApp a través de ese número?</label>
                </div>
            </fieldset>

            <fieldset>
                <legend class="text-xl pb-4">Contacto de emergencia</legend>
                <article>
                    <div class="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="emergency_name"
                            id="emergency_name"
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
                            id="emergency_phone"
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
                <legend class="text-xl pb-4">Información de salud</legend>
                <article>
                    <section class="pb-4">
                        <p>Tipo de sangre</p>
                        <section class="abo-rh-factor flex">
                            <div class="flex items-center me-4">
                                <input
                                    id="bloodA"
                                    value="A"
                                    required
                                    type="radio"
                                    name="blood_type"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="bloodA" class="ms-2 text-sm font-medium">A</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="bloodB"
                                    value="B"
                                    required
                                    type="radio"
                                    name="blood_type"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="bloodB" class="ms-2 text-sm font-medium">B</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="bloodAB"
                                    value="AB"
                                    required
                                    type="radio"
                                    name="blood_type"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="bloodAB" class="ms-2 text-sm font-medium">AB</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="bloodO"
                                    value="O"
                                    required
                                    type="radio"
                                    name="blood_type"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="bloodO" class="ms-2 text-sm font-medium">O</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="plus"
                                    value="+"
                                    type="radio"
                                    required
                                    name="rh_factor"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="plus" class="ms-2 text-sm font-medium">+</label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="minus"
                                    value="-"
                                    required
                                    type="radio"
                                    name="rh_factor"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label for="minus" class="ms-2 text-sm font-medium">-</label>
                            </div>
                        </section>
                    </section>

                    {#if carnet_id === "puerta-oro"}
                        <section class="pb-6">
                            <p>Sexo</p>
                            <section class="flex space-x-2">
                                <div class="flex items-center me-4">
                                    <input
                                        id="male"
                                        value="male"
                                        required
                                        type="radio"
                                        name="sex"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label for="male" class="ms-2 text-sm font-medium"
                                        >Hombre</label>
                                </div>
                                <div class="flex items-center me-4">
                                    <input
                                        id="female"
                                        value="female"
                                        required
                                        type="radio"
                                        name="sex"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label for="female" class="ms-2 text-sm font-medium"
                                        >Mujer</label>
                                </div>
                            </section>
                            <p class="text-xs">
                                Esta información es necesaria para distribuir las habitaciones.
                            </p>
                        </section>
                    {/if}

                    <section class="relative z-0 w-full mb-6 group">
                        <label for="feeding" class="block mb-2 text-sm"
                            >¿Tienes alguna restricción alimentaria? ¿Cuál?</label>
                        <textarea
                            name="feeding"
                            id="feeding"
                            rows="4"
                            class="block w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0"
                        ></textarea>
                    </section>

                    <section class="relative z-0 w-full mb-6 group">
                        <label for="health" class="block mb-2 text-sm"
                            >¿Tienes alguna restricción de salud? ¿Cuál?</label>
                        <textarea
                            name="health"
                            id="health"
                            rows="4"
                            class="block w-full border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0"
                        ></textarea>
                    </section>
                </article>
            </fieldset>

            <fieldset>
                <legend class="text-xl">Resumen de compra</legend>
                <article>
                    <p>Carnet {badge?.title}.</p>
                    {#if isColombian}
                        <p>${badge?.price[2]} 000 pesos colombianos.</p>
                    {:else}
                        <p>${badge?.price_in_usd} dólares estadounidenses.</p>
                    {/if}
                </article>
            </fieldset>

            <button
                class="bg-blue-600 text-white p-2 px-12 rounded-md cursor-pointer"
                type="submit">
                Ir a {isColombian ? "Wompi" : "PayPal"}
            </button>
            <button
                class="bg-red-600 text-white p-2 rounded-md cursor-pointer"
                onclick={() => node.close()}>
                Cancelar
            </button>
        </form>
    </section>
</dialog>
