import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { writeFileSync, readFileSync, existsSync } from "fs";

export default defineConfig({
  base: "/",
  server: { port: 3000 },
  ssr: { noExternal: ["@mui/*"] },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      target: "github-pages",
      spa: { enabled: true },
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        concurrency: 4,
      },
      sitemap: { host: "https://fewknowme.github.io" },
    }),
  ],
});
