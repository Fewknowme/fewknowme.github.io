import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";

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
      closeBundle() {
        const outputDir = resolve(process.cwd(), ".output/public");
        const indexPath = resolve(outputDir, "index.html");
        const notFoundPath = resolve(outputDir, "404.html");
        const nojekyllPath = resolve(outputDir, ".nojekyll");

        console.log("Looking for index.html at:", indexPath);

        if (existsSync(indexPath)) {
          const indexHtml = readFileSync(indexPath, "utf-8");

          writeFileSync(notFoundPath, indexHtml);
          console.log("✅ 404.html generated at:", notFoundPath);

          writeFileSync(nojekyllPath, "");
          console.log("✅ .nojekyll file created at:", nojekyllPath);
        } else {
          console.warn("⚠️ index.html not found at:", indexPath);

          try {
            const files = require("fs").readdirSync(outputDir);
            console.log("Files in output directory:", files);
          } catch (err) {
            console.warn("Could not read output directory:", outputDir);
          }
        }
      },
    },
  ],
});
