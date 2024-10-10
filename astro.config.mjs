import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import path from 'path';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
  output: "hybrid",
  adapter: netlify(),
  integrations: [
    tailwind({
      nesting: true
    }),
    react()
  ]
});