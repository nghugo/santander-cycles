import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarGutter: "stable both-edges",
          }
        }
      }
    },
    palette: {
      primary: {
        main: "#2196F3",
      },
      secondary: {
        main: "#FF5722",
      },
    },
    typography: {
      h5: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 600,
        fontSize: 14,
      },
      subtitle2: {
        fontSize: 14,
      },
      body2: {
        fontSize: 13,
        display: "block",
      },
      body3: {
        fontSize: 13,
        display: "block",
        fontWeight: 500,
      },
      muted: {
        fontSize: 16,
        color: "slategrey",
        display: "block",
        marginBottom: "16px",
        marginTop: "16px",
      },
      muted2: {
        fontSize: 12,
        color: "slategrey",
        display: "block",
      },
    },
  })
);