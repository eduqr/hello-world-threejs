import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        lines: resolve(__dirname, "experiments/01-lines/index.html"),
        models: resolve(__dirname, "experiments/02-models/index.html"),
        particles: resolve(__dirname, "experiments/03-particles/index.html"),
      },
    },
  },
});
