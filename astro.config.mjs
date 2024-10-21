// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), svelte()],
  server: {
    port: 3000,
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    ssr: {
      external: ['fs', 'http', 'https', 'url'],
    },
  },
});
