import { defineConfig, sharpImageService } from 'astro/config';
import { loadEnv } from 'vite';
const {
  SITE_URL
} = loadEnv(import.meta.env.MODE, process.cwd(), '');
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL ?? 'http://localhost:4321',
  scopedStyleStrategy: 'where',
  image: {
    service: sharpImageService()
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: false,
    }
  },
  integrations: [
    mdx(),
    sitemap(),
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});