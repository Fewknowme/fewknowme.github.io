import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, PluginOption } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      target: "static",
      pages: [
        {
          path: "/",
          prerender: {
            crawlLinks: true,
            enabled: true,
          },
        },
      ],
    }),
  ],
});
