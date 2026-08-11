import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const isVercel = !!process.env.VERCEL;
const isProd = process.env.NODE_ENV === 'production';
const base = isVercel ? '/' : (isProd ? '/pliego-astro/' : '/');

export default defineConfig({
  output: 'static',
  base,
  site: 'https://daardev.github.io/pliego-astro',
  trailingSlash: 'never',
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});