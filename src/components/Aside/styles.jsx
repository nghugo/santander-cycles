import { Box } from "@mui/material";

export const AsideContent = (props) => (
  <Box
    sx={{
      pr: { xs: 0, md: 2 },
      position: { md: "absolute" },
      overflow: { md: "auto" },
      width: { md: "100%" },
      height: { md: "100%" },
    }}
  >
    {props.children}
  </Box>
);
