import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
export default {
    alias: {
        "@components/*": "./src/components/*",
        "@icons/*": "./src/icons/*"
    },
    preprocess: vitePreprocess(),
    kit: { adapter: adapter() }
};