import { Box } from "@mui/material";

export const MapContent = (props) => (
  <Box
    sx={{
      height: "100%",
      width: "100%",
      position: "absolute",
      minHeight: { xs: "80vh", md: 0 },
      pb: { xs: 1, sm: 2, md: 0 },
    }}
  >
    {props.children}
  </Box>
);
