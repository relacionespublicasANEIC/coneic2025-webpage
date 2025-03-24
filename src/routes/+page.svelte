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

<main class="flex justify-content align-middle">
    <h2 class="text-4xl">Estamos consruyendo la página de tus sueños...</h2>
</main>
