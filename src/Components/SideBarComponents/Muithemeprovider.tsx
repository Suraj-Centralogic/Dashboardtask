"use client";
import * as React from "react";
import { CssBaseline, type PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type Props = { children: React.ReactNode; mode?: PaletteMode };

export function MuiThemeProvider({ children, mode = "light" }: Props) {
  const theme = React.useMemo(
    () =>
      createTheme({
       palette: {
  mode,
  primary: { main: "#2563EB" },
  secondary: { main: "#ffffffcc" }, 
  success: { main: "#16A34A" },   
  error: { main: "#EF4444" },
  warning: { main: "#F59E0B" },
  background: {
    default: mode === "light" ? "#f4f6fb" : "#0B1020",
    paper: mode === "light" ? "#ffffff" : "#0F162E",
  },
},
        shape: { borderRadius: 16 },
        typography: {
          fontFamily:
            "Poppins, var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system",
          fontWeightBold: 800,
        },
        components: {
          MuiButton: {
            defaultProps: { variant: "contained" },
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 999,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              rounded: { borderRadius: 16 },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
