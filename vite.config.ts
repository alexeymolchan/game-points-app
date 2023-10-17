/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/game-points-app" : "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup",
    resolveSnapshotPath: (testPath, snapExtension) =>
      `${testPath}${snapExtension}`,
  },
  server: {
    open: true,
  },
  define: {
    APP_VERSION: JSON.stringify(version),
  },
}));
