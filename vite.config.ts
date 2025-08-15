import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { writeFileSync, readFileSync, existsSync } from "fs";

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["@mui/*"],
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      spa: {
        enabled: true,
      },
      prerender: {
        crawlLinks: false,
        enabled: true,
      },
      sitemap: {
        host: "https://fewknowme.github.io",
      },
    }),
    {
      name: "spa-fallback-404",
      writeBundle() {
        const indexPath = resolve(__dirname, "dist/index.html");
        if (existsSync(indexPath)) {
          const indexHtml = readFileSync(indexPath, "utf-8");
          writeFileSync(resolve(__dirname, "dist/404.html"), indexHtml);
          console.log("✅ 404.html generated for GitHub Pages SPA fallback");
        } else {
          console.warn("⚠️ index.html not found, skipping 404.html generation");
        }
      },
    },
  ],
});
