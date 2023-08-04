import { defineConfig } from 'vitest/config';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    createHtmlPlugin({ minify: true, entry: 'src/index.tsx' }),
    react(),
    tsConfigPaths()
  ],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
