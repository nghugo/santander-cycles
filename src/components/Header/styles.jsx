import { styled } from "@mui/system";
import { AppBar, Typography} from "@mui/material";

export const IconLink = styled("a")({
  marginLeft: "8px",
  display: "flex",
  alignItems: "center",
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
      px: { xs: 1, sm: 2 },
      py: 1,
      display: "flex",
      flexDirection: "row",
    }}
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
