import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/poc/' : '/',
  optimizeDeps: {
    exclude: ['@clerk/clerk-js'],
  },
});
