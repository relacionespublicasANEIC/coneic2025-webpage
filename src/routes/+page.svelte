<script lang="ts">
    import "../styles.css";
    import RemainingTime from "../components/remaining-time.svelte";

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

<main class="p-8 pt-0 flex flex-col justify-center align-middle">
<h3 class="text-2xl md:text-4xl text-center">Estamos construyendo la página de tus sueños</h3>
<a class="text-xl md:text-2xl text-center text-barranquilla-blue hover:text-purple-800" target="_blank" href="https://www.instagram.com/coneicco_oficial">Si quieres más información revisa nuestra cuenta de Instagram</a>

<br />

<h4 class="text-center text-xl">Falta para el evento</h4>
<div class="w-full md:w-1/4 mx-auto">
    <RemainingTime />
</div >
        
</main>

    
