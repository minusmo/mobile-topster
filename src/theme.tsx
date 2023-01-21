import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    padding: {
      default: 2;
    };
  }
  interface ThemeOptions {
    padding?: {
      default?: number;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#739574',
      light: '#a5d6a7',
      dark: '#2e7d32',
      contrastText: '#114'
    },
    secondary: {
      main: '#ffb300',
      light: '#ffc233',
      dark: '#b27d00',
      contrastText: '#114'
    }
  },
  padding: {
    default: 2
  }
});
