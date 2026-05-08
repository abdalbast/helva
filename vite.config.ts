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
