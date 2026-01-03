import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Since we are running a separate Express server, 
  // we can use Astro for the static frontend.
  output: 'static',
  server: {
    port: 3000
  }
});
