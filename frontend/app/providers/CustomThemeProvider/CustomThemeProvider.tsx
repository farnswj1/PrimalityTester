import { type FC, type PropsWithChildren } from "react";
import { type Theme, ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    background: {
      default: "#f5f5dc"
    }
  }
});

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomThemeProvider;
