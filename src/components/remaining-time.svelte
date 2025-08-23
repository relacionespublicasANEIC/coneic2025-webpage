<script lang="ts">
    import { onMount } from "svelte";
    const targetDate = new Date("2025-11-04");
    let now = $state(Date.now());
    let remainingTime = $derived.by(() => {
        const difference = Math.max(0, targetDate.getTime() - now);
        const days = Math.floor(difference / 86_400_000);
        const hours = Math.floor((difference % 86_400_000) / 3600000);
        const minutes = Math.floor((difference % 3_600_000) / 60000);
        const seconds = Math.floor((difference % 60_000) / 1000);

        return [
            { text: "días", quantity: days.toString().padStart(2, "0") },
            { text: "horas", quantity: hours.toString().padStart(2, "0") },
            { text: "minutos", quantity: minutes.toString().padStart(2, "0") },
            { text: "segundos", quantity: seconds.toString().padStart(2, "0") },
        ];
    });

    onMount(() => {
        const thisInterval = setInterval(() => (now = Date.now()), 1000);
        return () => clearInterval(thisInterval);
    });
</script>

<div class="grid grid-cols-4 gap-2">
    {#each remainingTime as element}
        <div class="text-center">
            <p class="text-4xl">{element.quantity}</p>
            <p class="text-xl">{element.text}</p>
        </div>
    {/each}
</div>
