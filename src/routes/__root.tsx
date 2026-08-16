/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import createCache from "@emotion/cache";
import React from "react";
import AppAppBar from "~/components/Header";
import AppTheme from "~/shared-theme/AppTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "~/styles/global.css";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        charSet: "utf-8",
      },
      {
        title: "Rohit Madas — Frontend Engineer",
      },
      {
        name: "description",
        content:
          "Portfolio of Rohit Madas, a frontend engineer building ambitious web and mobile products.",
      },
      { name: "theme-color", content: "#0b0b0b" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = React.useMemo(() => createCache({ key: "css" }), []);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <AppTheme>{children}</AppTheme>
      </QueryClientProvider>
    </CacheProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <CssBaseline enableColorScheme />
          <AppAppBar />
          {children}
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
