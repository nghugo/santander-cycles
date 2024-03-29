import { Box } from "@mui/material";

export const MapContent = (props) => (
  <Box
    sx={{
      height: "100%",
      width: "100%",
      position: "absolute",
      minHeight: { xs: "86vh", md: 0 },
      pb: { xs: 1, sm: 2, md: 0 },
    }}
  >
    {props.children}
  </Box>
);

export const MarkerContainer = (props) => {
  // exclude {...props} to remove props from container https://github.com/google-map-react/google-map-react/issues/583
  // bottom-centered using top, left,
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        top: "-40px", // -50px, but +10px to account for 10px paddingBottom of PopoverMarker
        left: "-25px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
      }}
    >
      {props.children}
    </div>
  );
};

export const ClusterContainer = (props) => {
  // exclude {...props} to remove props from container https://github.com/google-map-react/google-map-react/issues/583
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        top: "-50px",
        left: "-50px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
};

export const RouteBannerContainer = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 999,
        width: "200px",
        left: 'calc(-100px + 50%)',  // position in middle, accounting for width
        top: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: "3px",
        paddingBottom: "3px",
        borderRadius: "30px",
        outline: "1px solid slategrey"
      }}
    >
      {props.children}
    </div>
  );
};
