<script lang="ts">
    import LogosCarrousel from "../components/logos-carrousel.svelte";
    import RemainingTime from "../components/remaining-time.svelte";
    import BadgeCircle from "../icons/badge-circle.svelte";
    import BadgeSquare from "../icons/badge-square.svelte";
    import BadgeStar from "../icons/badge-star.svelte";

    const badges = [
        {
            badge: BadgeCircle,
            title: "Carnet La Arenosa",
            price: "900 mil pesos",
            link: "#arenosa",
        },
        {
            badge: BadgeSquare,
            title: "Carnet La Arenosa",
            price: "900 mil pesos",
            link: "#arenosa",
        },
        {
            badge: BadgeStar,
            title: "Carnet La Arenosa",
            price: "900 mil pesos",
            link: "#arenosa",
        },
    ];
</script>

<header class="flex mb-8 relative">
    <section class="w-1/4">
        <img src="coneic2025.webp" alt="Logo del CONEIC 2025" />
    </section>
    <section class="w-3/4 flex flex-col-reverse px-4 py-16">
        <h1 class="text-6xl">Congreso Nacional de Estudiantes de Ingeniería Civil</h1>
        <h2 class="text-2xl">Barranquilla, 2025</h2>
    </section>
</header>

<main class="grid grid-rows-4 grid-cols-3 gap-2 h-screen mb-8">
    <article class="row-span-3 p-4 rounded-md border-solid border-1 shadow-md">
        <iframe
            src="https://calendar.google.com/calendar/embed?wkst=2&ctz=America%2FBogota&showPrint=0&showTz=0&mode=AGENDA&showTabs=0&showNav=0&showCalendars=0&title&src=NTM0NDIzY2MwOGY5NzE1MzY3ZmFmNjlhZGZkNWU2MzhhZWEzYzY3NjcxY2Y3NzIzYWRiODhhY2RkOGE4MDdjM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"
            frameborder="0"
            scrolling="no"
            title="Calendario con eventos de ANEIC Colombia"
            class="w-full h-full"></iframe>
    </article>

    <article class="row-span-2 p-4 rounded-md border-solid border-1 shadow-md">a</article>

    <article class="row-span-1 p-4 rounded-md border-solid border-1 shadow-md">
        <LogosCarrousel />
    </article>

    <article class="row-span-1 p-4 rounded-md border-solid border-1 shadow-md">
        <div class="h-full flex flex-col justify-center align-middle">
            <RemainingTime />
        </div>
    </article>

    <article class="col-start-1 row-span-1 rounded-md border-solid border-1 shadow-md">
        <div class="instagram-button h-full flex justify-center align-middle">
            <div>
                <a
                    class="text-white text-2xl font-bold align-bottom"
                    href="https://instagram.com/aneiccolombia">Síguenos en Instagram</a>
            </div>
        </div>
    </article>

    <article
        class="col-start-2 row-start-3 row-span-2 p-4 rounded-md border-solid border-1 shadow-md">
        galeria de fotos
    </article>

    <article
        class="col-start-3 row-start-3 row-span-2 p-4 rounded-md border-solid border-1 shadow-md">
        <div class="h-full flex justify-center align-middle">
            <div class="w-full">
                {#each badges as badge}
                    <article class="flex">
                        <div class="w-1/4">
                            <badge.badge />
                        </div>
                        <div class="w-3/4">
                            <h4 class="text-2xl">{badge.title}</h4>
                            <p>{badge.price}</p>
                            <a href={badge.link}>Ver más</a>
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </article>
</main>

<footer>Contacto Necesitas más ino Necesitas una carta de invitación</footer>

<style>
    .instagram-button {
        background: linear-gradient(-10deg, rgba(179, 0, 179, 0.1) 70%, blue 110%),
            radial-gradient(circle farthest-corner at 30% 100%, #ff9 0%, rgba(255, 165, 0, 0.2) 40%),
            linear-gradient(20deg, red, #b300b3, blue);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
</style>
