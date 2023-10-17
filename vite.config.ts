import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/game-points-app/",
  plugins: [react()],
  server: {
    open: true,
  },
});
