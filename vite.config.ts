import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";

/** Strips known legacy polyfills already present in dependencies (e.g. posthog-js) */
function stripLegacyPolyfills(): Plugin {
  return {
    name: "strip-legacy-polyfills",
    apply: "build",
    renderChunk(code) {
      return {
        code: code.replace(
          /Math\.trunc\|\|\(Math\.trunc=function\([^)]*\)\{[^}]*\}\)/g,
          "Math.trunc"
        ),
        map: null,
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-i18n": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          "vendor-analytics": ["posthog-js"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-helmet": ["react-helmet-async"],
        },
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    stripLegacyPolyfills(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
