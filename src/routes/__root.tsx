/// <reference types="vite/client" />
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { CacheProvider } from "@emotion/react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import React from "react";
import AppAppBar from "~/components/Header";
import Latest from "~/components/Latest";
import AppTheme from "~/shared-theme/AppTheme";
import MainContent from "~/components/MainContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: fontsourceVariableRobotoCss }],
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
  const emotionCache = createCache({ key: "css" });

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider theme={theme}> */}

        <AppTheme>{children}</AppTheme>
      </QueryClientProvider>
      {/* </ThemeProvider> */}
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

          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
          >
            <MainContent />
            {/* <Latest></Latest> */}
          </Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
