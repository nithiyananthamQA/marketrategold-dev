// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://marketrategold.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      minify: 'esbuild', // Using esbuild (faster, built-in)
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
  compressHTML: true,
});