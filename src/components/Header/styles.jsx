import { styled } from "@mui/system";
import { AppBar, Typography, Box } from "@mui/material";

export const IconLink = styled("a")({
  marginLeft: "8px",
  display: "flex",
  alignItems: "center",
  "& svg": {
    transition: "transform 0.1s ease-out",
  },
  "&:hover svg path": {
    fill: "#FFEB3B",
  },
  "&:hover svg": {
    transform: "translate(0, -3px)",
  },
});

export const IconGroup = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const FlexAppBar = (props) => (
  <AppBar
    position="static"
    sx={{
      px: 2,
      py: 1,
      display: "flex",
      flexDirection: "row",
      zIndex: "1",
    }}
    elevation={2}
  >
    {props.children}
  </AppBar>
);

export const HeaderTitle = (props) => (
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      fontFamily: "RobotoCondensed",
      display: "inline",
    }}
  >
    {props.children}
  </Typography>
);

export const HeaderTitleSection = (props) => (
  <Box
    sx={{
      display: "flex",
      columnGap: "10px",
      alignItems: "center",
    }}
  >
    {props.children}
  </Box>
);
