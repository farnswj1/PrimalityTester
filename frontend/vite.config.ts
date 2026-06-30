import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vitest/config";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({ plugins: ["babel-plugin-react-compiler"] })
  ],
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
