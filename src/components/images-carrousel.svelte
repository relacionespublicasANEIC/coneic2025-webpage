<script>
    import { onMount } from "svelte";
    const images = [
        {
            src: "https://m.ahstatic.com/is/image/accorhotels/carnaval-de-barranquilla-cuando-es-y-que-se-celebra-2024-2:3by2",
            title: "La puerta de oro",
            description: "",
        },
        {
            src: "https://alfatripcartagena.com.co/wp-content/uploads/2020/03/day-tour-de-compras-a-barranquilla-1.jpeg",
            title: "Bienvenida",
            description: "",
        },
        {
            src: "https://turismo.encolombia.com/wp-content/uploads/2019/12/Playas-en-Barranquilla-que-Debes-Conocer.webp",
            title: "Hotel",
            description: "",
        },
    ];

    let currIndex = $state(0);
    let currDir = $state(1);
    let image = $derived(images[currIndex]);

    onMount(() => {
        const thisInterval = setInterval(() => {
            currIndex += currDir;
            currDir = currIndex === 0 || currIndex === images.length ? currDir * -1 : currDir;
        }, 5000);
        return () => clearInterval(thisInterval);
    });
</script>

<figure class="h-full w-full flex justify-center align-middle relative overflow-hidden group">
    <img class="object-cover" src={image.src} alt={"Fotografia de " + image.title} />
    <figcaption class="h-full hidden group-hover:block absolute w-full p-4 bg-black/50 text-white">
        <p class="text-2xl">{image.title}</p>
        <section>{image.description}</section>
    </figcaption>
</figure>
