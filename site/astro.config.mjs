import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  output: 'static',
});
