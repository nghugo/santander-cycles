import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarGutter: "stable both-edges",
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#2196F3",
      },
      secondary: {
        main: "#FF5722",
      },
      custom1: {
        main: "#FFA000",
      },
    },
    typography: {
      h5: {
        fontWeight: 600,
        fontSize: "22px",
        marginBottom: "16px"
      },
      subtitle1: {
        fontWeight: 600,
        fontSize: 14,
        m: 0,
        p: 0,
      },
      subtitle2: {
        fontSize: 14,
        marginBottom: "4px",
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
      body4: {
        fontSize: 13,
        display: "inline",
      },
      body5: {
        fontSize: 16,
        display: "block",
      },
      muted: {
        fontSize: 16,
        color: "slategrey",
        display: "inline",
      },
      muted2: {
        fontSize: 13,
        color: "slategrey",
        display: "block",
      },
      large: {
        fontSize: 32,
        display: "block",
      },
    },
  })
);
