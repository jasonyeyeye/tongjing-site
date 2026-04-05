// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
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
    defaultLocale: 'en',
    locales: ['zh', 'en', 'ja', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
