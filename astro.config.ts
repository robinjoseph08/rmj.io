import react            from '@astrojs/react';
import sitemap          from '@astrojs/sitemap';
import tailwindcss      from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rmj.io',
  outDir: './build',
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  },
  server: {
    host: true,
    port: 5123
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
