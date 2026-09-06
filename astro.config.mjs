import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/site.config.ts';

export default defineConfig({
  site: siteConfig.site,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
