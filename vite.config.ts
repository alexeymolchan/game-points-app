/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
});
