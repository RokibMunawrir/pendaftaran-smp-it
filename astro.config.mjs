// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  output: "server",
  vite: {
    plugins: [tailwind()],
  },
}); 