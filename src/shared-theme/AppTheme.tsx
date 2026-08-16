import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "portfolio",
          },
          colorSchemes: {
            light: {
              palette: {
                background: { default: "#f4f0e8", paper: "#fffdf7" },
                text: { primary: "#171714", secondary: "#615f58" },
                primary: { main: "#e8563f" },
                divider: "rgba(23, 23, 20, 0.16)",
              },
            },
            dark: {
              palette: {
                background: { default: "#0b0b0a", paper: "#141412" },
                text: { primary: "#f5f0e6", secondary: "#aaa59b" },
                primary: { main: "#ff6b52" },
                divider: "rgba(245, 240, 230, 0.16)",
              },
            },
          },
          typography: {
            fontFamily: '"Manrope", sans-serif',
            h1: { fontFamily: '"Playfair Display", serif' },
            h2: { fontFamily: '"Playfair Display", serif' },
            h3: { fontFamily: '"Playfair Display", serif' },
            button: { fontFamily: '"DM Mono", monospace' },
          },
          shape: { borderRadius: 0 },
          components: {
            ...themeComponents,
            MuiCssBaseline: {
              styleOverrides: {
                html: {
                  scrollBehavior: "smooth",
                },
                body: { minWidth: 320 },
              },
            },
            MuiDialog: {
              styleOverrides: {
                paper: {
                  border: "1px solid var(--line)",
                  backgroundImage: "none",
                },
              },
            },
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
