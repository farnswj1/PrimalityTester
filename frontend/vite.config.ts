import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  preview: {
    host: "127.0.0.1"
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
});
