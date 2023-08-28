import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
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
      muted: {
        fontSize: 16,
        color: "slategrey",
        display: "block",
        marginBottom: "16px",
        marginTop: "16px",
      },
      body2: {
        fontSize: 13,
        display: "block",
      },
      muted2: {
        fontSize: 12,
        color: "slategrey",
        display: "block",
      },
    },
  })
);