import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  },
  plugins: [
    vue(),
    Components({
      extensions: ["vue"],
    }),
    chromeExtension() as any,
  ],
});
