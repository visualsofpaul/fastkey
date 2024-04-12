import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  },
  plugins: [vue(), chromeExtension() as any],
});
