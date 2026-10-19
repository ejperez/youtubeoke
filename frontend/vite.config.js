import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    envDir: resolve(import.meta.dirname, ".."),
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, "index.html"),
          nested: resolve(import.meta.dirname, "remote.html"),
        },
      },
    },
    base: "/",
    server: {
      port: 3001,
      strictPort: true,
    },
  };
});
