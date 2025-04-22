import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@': './src',
      '@test': './test',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@': './src',
      '@test': './test',
    },
  },
  plugins: [swc.vite()],
});
