import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/mail": {
        target: "http://localhost:6000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mail/, ""),
      },
    },
  },
});
