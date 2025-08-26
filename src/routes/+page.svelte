<script lang="ts">
    import "../styles.css";
    import RemainingTime from "../components/remaining-time.svelte";
    import ImageCard from "../components/image-card.svelte";
    import TypingText from "../components/typing-text.svelte";
    import BrandInstagram from "../components/brand-instagram.svelte";
    import PciCompliant from "../icons/pci-compliant.svelte";
    import images from "../data/images.json";
    import badges from "../data/badges.json";
</script>

<section class="p-8">
    <header class="flex flex-col md:flex-row relative justify-center align-middle">
        <img class="w-full md:w-1/4" src="coneic2025.webp" alt="Logo del CONEIC 2025" />
        <div
            class="w-full md:w-3/4 text-center md:text-left flex flex-col-reverse px-0 md:px-8 md:py-4 font-potta">
            <h1 class="text-4xl md:text-6xl">
                <span class="text-barranquilla-green">Congreso Nacional</span>
                <span class="text-barranquilla-blue">de Estudiantes</span>
                <span class="text-barranquilla-red">de Ingeniería Civil</span>
            </h1>
            <h2 class="hidden md:block text-2xl">Barranquilla, 2025</h2>
        </div>
    </header>

    <main class="pt-8 pb-4 md:w-1/3 mx-auto">
        <h3 class="font-light text-center">Organizadores</h3>
        <div class="flex justify-around items-center">
            <a class="w-1/3" href="https://instagram.com/aneiccolombia">
                <img src="aneic_uninorte.svg" alt="Logo de ANEIC UniNorte" />
            </a>
            <a class="w-1/3" href="https://instagram.com/aneicuninorte">
                <img src="aneic_colombia.svg" alt="Logo de ANEIC Colombia" />
            </a>
        </div>
    </main>

    <section class="md:flex justify-around items-center gap-4">
        <div class="grow md:w-1/2">
            <main class="py-4 mx-auto">
                <h3 class="font-light text-center">Ubicación</h3>
                <p class="text-center text-2xl">Universidad del Norte, Barranquilla, Colombia</p>
            </main>
        </div>
        <div class="grow md:w-1/2">
            <main class="py-4 mx-auto">
                <h3 class="font-light text-center">Tiempo faltante</h3>
                <RemainingTime />
            </main>
        </div>
    </section>

    <main class="py-4">
        <a
            href="https://instagram.com/coneicco_oficial"
            class="flex instagram-button text-white p-2 px-6 md:w-1/3 mx-auto items-center rounded-md">
            <div class="w-12 stroke-white">
                <BrandInstagram />
            </div>
            <div class="grow">
                <p class="text-center text-xl">Mántente al día en nuestra redes</p>
            </div>
        </a>
    </main>
</section>

<main class="bg-linear-to-r from-barranquilla-green to-barranquilla-yellow shadow-md">
    <div class="p-4 font-bebas min-h-40 max-h-80 md:h-auto">
        <p class="md:text-4xl text-2xl text-center text-white align-middle h-full">
            El <span class="text-barranquilla-blue">CONEIC</span> es <TypingText />
        </p>
    </div>
</main>

<section class="p-8">
    <section class="md:grid grid-cols-3 gap-8">
        {#each images as image}
            <ImageCard src={image.src} description={image.description} />
        {/each}
    </section>
</section>

<main class="bg-linear-to-r from-barranquilla-red to-barranquilla-yellow shadow-md">
    <section class="p-8 md:px-40 md:flex items-center">
        <h2 class="md:text-4xl text-2xl font-bold md:text-center text-white pb-8 grow">
            ¿Necesitas una carta de invitación?
        </h2>
        <form action="/carta" target="_blank" class="max-w-md mx-auto md:w-2/4">
            <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="name"
                    class="block py-2 px-0 w-full text-white border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required />
                <label
                    for="name"
                    class="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Tu nombre</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="university"
                    class="block py-2 px-0 w-full text-white border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required />
                <label
                    for="university"
                    class="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre de tu universidad</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                    type="email"
                    name="email"
                    class="block py-2 px-0 w-full text-white border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required />
                <label
                    for="email"
                    class="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Tu correo</label>
            </div>
            <button
                type="submit"
                class="text-white bg-barranquilla-blue hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >Obtener</button>
        </form>
    </section>
</main>

<section class="p-8">
    <main
        id="carnets"
        class="space-y-4 has-target:space-y-12 md:space-y-0 md:grid grid-cols-3 gap-6 justify-items-center justify-between align-middle">
        {#each badges as badge}
            <article
                id={badge.link}
                class="w-full flex flex-col rounded-md p-6 {badge.color} text-white shadow-md target:scale-110 target:shadow-2xl">
                <h3 class="text-4xl text-center pt-4">{badge.title}</h3>
                <div class="relative flex py-4">
                    <span class="absolute text-xl">COP$</span>
                    <p class="text-8xl text-center grow">{badge.price[2]}</p>
                    <span class="absolute text-xl bottom-4 right-0">mil</span>
                </div>

                <ul class="list-disc list-inside grow">
                    {#each badge.features as feat}
                        <li>{feat}</li>
                    {/each}
                </ul>

                <button class="text-2xl mt-4 border-2 p-2 rounded-md {badge.color} cursor-pointer">
                    <a href={"https://checkout.wompi.co/l/" + badge.payment}>Comprar</a>
                </button>
            </article>
        {/each}
    </main>
    <div class="w-full flex alig justify-center items-center">
        <div>
            <p class="align-middle">Con la tecnología de</p>
        </div>
        <div class="w-1/3 md:w-1/5">
            <PciCompliant />
        </div>
    </div>
</section>

<style>
    .instagram-button {
        background: linear-gradient(-10deg, rgba(179, 0, 179, 0.1) 70%, blue 110%),
            radial-gradient(circle farthest-corner at 30% 100%, #ff9 0%, rgba(255, 165, 0, 0.2) 40%),
            linear-gradient(20deg, red, #b300b3, blue);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
</style>
