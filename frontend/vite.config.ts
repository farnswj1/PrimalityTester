import { defineConfig } from 'vitest/config';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({ minify: true, entry: 'src/index.tsx' }),
    react(),
    tsConfigPaths()
  ],
  build: {
    chunkSizeWarningLimit: 1024
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
