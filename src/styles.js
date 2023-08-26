import {createTheme, responsiveFontSizes} from "@mui/material/styles";

export const theme = responsiveFontSizes(createTheme({
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
    body2: {
      fontSize: 16,
      color: "slategrey"
    },
  },
}));
