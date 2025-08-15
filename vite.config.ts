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
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        concurrency: 4,
      },
      sitemap: {
        host: "https://fewknowme.github.io",
      },
    }),
    {
      name: "spa-fallback-404",
      closeBundle() {
        const outputDir = resolve(process.cwd(), ".output/public");
        const shellPath = resolve(outputDir, "_shell.html");
        const indexPath = resolve(outputDir, "index.html");
        const notFoundPath = resolve(outputDir, "404.html");
        const nojekyllPath = resolve(outputDir, ".nojekyll");
        console.log("Looking for _shell.html at:", shellPath);
        if (existsSync(shellPath)) {
          const shellHtml = readFileSync(shellPath, "utf-8");
          writeFileSync(indexPath, shellHtml);
          console.log("✅ index.html generated at:", indexPath);
          writeFileSync(notFoundPath, shellHtml);
          console.log("✅ 404.html generated at:", notFoundPath);
          writeFileSync(nojekyllPath, "");
          console.log("✅ .nojekyll file created at:", nojekyllPath);
        } else {
          console.warn("⚠️ _shell.html not found at:", shellPath);
        }
      },
    },
  ],
});
