// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), sitemap({
    i18n: {
      defaultLocale: 'zh',
      locales: {
        zh: 'zh-CN',
        en: 'en-US',
        ja: 'ja-JP',
        de: 'de-DE',
      },
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://tongjing.example.com',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja', 'de'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
