<script lang="ts">
    import "../styles.css";
    import LogosCarrousel from "../components/logos-carrousel.svelte";
    import RemainingTime from "../components/remaining-time.svelte";
    import ImagesCarrousel from "../components/images-carrousel.svelte";
    import BrandInstagram from "../components/brand-instagram.svelte";
    import BadgeCircle from "../icons/badge-circle.svelte";
    import BadgeSquare from "../icons/badge-square.svelte";
    import BadgeStar from "../icons/badge-star.svelte";

    const badges = [
        {
            icon: BadgeCircle,
            title: "Carnet Puerta de Oro",
            price: ["COP$900.000", "USD$300", "900"],
            link: "puerta-oro",
            color: "bg-barranquilla-green",
            payment: "https://checkout.wompi.co/l/test_qbPtTR",
            features: [
                "Incluye hoteles",
                "Noche de gala",
                "Kit de bienvenida",
                "Asistencia a talleres",
                "Visitas turisitcas",
            ],
        },
        {
            icon: BadgeSquare,
            title: "Carnet Curramba",
            price: ["COP$330.000", "USD$100", "330"],
            link: "curramba",
            color: "bg-barranquilla-yellow",
            payment: "https://checkout.wompi.co/l/test_74hfLB",
            features: [
                "Incluye hoteles",
                "Noche de gala",
                "Kit de bienvenida",
                "Asistencia a talleres",
            ],
        },
        {
            icon: BadgeStar,
            title: "Carnet La Arenosa",
            price: ["COP$150.000", "USD$50", "150"],
            link: "arenosa",
            color: "bg-barranquilla-red",
            payment: "https://checkout.wompi.co/l/test_cwptJ3",
            features: ["Incluye hoteles", "Noche de gala", "Kit de bienvenida"],
        },
    ];
</script>

<header class="flex flex-col md:flex-row p-8 relative justify-center align-middle">
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

<main
    class="md:grid md:grid-rows-4 md:grid-cols-3 gap-2 space-y-4 md:space-y-0 mb-8 justify-center align-middle px-8 justify-items-stretch">
    <article class="row-span-3 rounded-md border-solid border-1 shadow-md overflow-hidden">
        <iframe
            src="https://calendar.google.com/calendar/embed?wkst=2&ctz=America%2FBogota&showPrint=0&showTz=0&mode=AGENDA&showTabs=0&showNav=0&showCalendars=0&src=NTM0NDIzY2MwOGY5NzE1MzY3ZmFmNjlhZGZkNWU2MzhhZWEzYzY3NjcxY2Y3NzIzYWRiODhhY2RkOGE4MDdjM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"
            frameborder="0"
            scrolling="no"
            title="Calendario con eventos de ANEIC Colombia"
            class="w-full h-96 md:h-full"></iframe>
    </article>

    <article
        class="row-span-2 p-4 rounded-md border-solid border-1 shadow-md flex flex-col align-middle justify-center">
        <p class="text-4xl text-center align-middle">
            El <span class="text-barranquilla-yellow">CONEIC</span> es un espacio donde los estudiantes
            pueden compartir su pasión por la ingeniería y encontrar inspiración en las experiencias
            de otros.
        </p>
    </article>

    <article class="row-span-1 p-4 rounded-md border-solid border-1 shadow-md">
        <!-- <LogosCarrousel /> -->
    </article>

    <article
        class="row-span-1 p-4 rounded-md border-solid border-1 shadow-md bg-barranquilla-green">
        <div class="h-full flex flex-col justify-center align-middle text-white">
            <RemainingTime />
        </div>
    </article>

    <article class="col-start-1 row-span-1 rounded-md border-solid border-1 shadow-md">
        <div class="instagram-button h-full w-full flex justify-center align-middle p-4">
            <div class="flex justify-center align-middle w-full">
                <div class="w-1/4 stroke-white">
                    <BrandInstagram />
                </div>
                <div class="w-3/4">
                    <a
                        class="text-white text-4xl font-bold align-bottom"
                        href="https://instagram.com/aneiccolombia">Síguenos en Instagram</a>
                </div>
            </div>
        </div>
    </article>

    <article class="col-start-2 row-start-3 row-span-2 rounded-md border-solid border-1 shadow-md">
        <ImagesCarrousel />
    </article>

    <article
        class="col-start-3 row-start-3 row-span-2 p-4 rounded-md border-solid border-1 shadow-md">
        <div class="w-full">
            {#each badges as badge}
                <article class="flex">
                    <div class="w-1/4">
                        <badge.icon />
                    </div>
                    <div class="w-3/4">
                        <h4 class="text-2xl">{badge.title}</h4>
                        <p>{badge.price[0]} | {badge.price[1]}</p>
                        <a href={`#${badge.link}`} class="text-barranquilla-blue">Ver más ⯈</a>
                    </div>
                </article>
            {/each}
        </div>
    </article>
</main>

<main class="bg-linear-to-r from-barranquilla-red to-barranquilla-yellow shadow-md">
    <div class="flex justify-center align-middle mx-auto">
        <button class="text-4xl text-white p-4 cursor-pointer"
            >¿Necesitas una carta de invitación?<br />Presiona aquí</button>
    </div>
</main>

<main
    class="px-16 py-8 space-y-4 has-target:space-y-12 md:space-y-0 md:grid grid-cols-3 gap-6 justify-items-center justify-between align-middle">
    {#each badges as badge}
        <article
            id={badge.link}
            class="flex bg-amber-200 flex-col w-full md:w-3/4 rounded-md p-4 {badge.color} text-white shadow-md target:scale-110 target:shadow-2xl">
            <h3 class="text-4xl text-center py-4">{badge.title}</h3>
            <div class="relative flex">
                <span class="absolute text-xl">COP$</span>
                <p class="text-8xl text-center grow">{badge.price[2]}</p>
                <span class="absolute text-xl bottom-4 right-0">mil</span>
            </div>

            <ul class="list-disc list-inside grow">
                {#each badge.features as feat}
                    <li>{feat}</li>
                {/each}
            </ul>

            <!-- <form>
                <script
                  src="https://checkout.wompi.co/widget.js"
                  data-render="button"
                  data-public-key="pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH"
                  data-currency="COP"
                  data-amount-in-cents="4950000"
                  data-reference="4XMPGKWWPKWQ"
                  data-signature:integrity="37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5"
                ></script>
              </form> -->

            <button class="text-2xl mt-4">
                <a href={badge.payment}>Paga por Wompi</a>
            </button>
        </article>
    {/each}
</main>

<style>
    .instagram-button {
        background: linear-gradient(-10deg, rgba(179, 0, 179, 0.1) 70%, blue 110%),
            radial-gradient(circle farthest-corner at 30% 100%, #ff9 0%, rgba(255, 165, 0, 0.2) 40%),
            linear-gradient(20deg, red, #b300b3, blue);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
</style>
