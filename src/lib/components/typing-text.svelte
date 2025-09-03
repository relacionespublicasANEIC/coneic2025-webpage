<script lang="ts">
    import { onMount } from "svelte";
    import lines from "$lib/data/lines.json";

    let index = $state(0);
    let direction = $state(1);
    let line = $derived(lines[index]);

    let charIndex = $state(1);
    let textSlice = $derived(line.slice(0, charIndex));

    function updatesIndexes() {
        if (charIndex >= line.length) {
            index += direction;
            direction = index == 0 || index == lines.length ? 1 : -1;
            charIndex = 0;
        } else {
            charIndex++;
        }
    }

    onMount(() => {
        const thisInterval = setInterval(updatesIndexes, 65);
        return () => clearInterval(thisInterval);
    });
</script>

<span>{textSlice}</span>
