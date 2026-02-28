import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false // ⚡ disable React Fast Refresh to fix injectIntoGlobalHook error
    }),
    tailwindcss()
  ],
  assetsInclude: ["**/*.html"] // tell Vite these are assets, not JS modules
});