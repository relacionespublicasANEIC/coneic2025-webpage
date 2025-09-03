<script lang="ts">
    export let src: string;
    export let description: string;
</script>

<figure class="shadow-md mb-4 p-2 rounded-md">
    <img class="mx-auto object-cover overflow-hidden w-full aspect-video" {src} alt="Fotografia" />
    <figcaption class="p-2">
        <p class="text-sm text-center">{description}</p>
    </figcaption>
</figure>
