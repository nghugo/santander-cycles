import React from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@mui/material";

const Map = ({ center }) => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          minHeight: { xs: "80vh", md: 0 },
          pb: { xs: 1, sm: 2, md: 0 },
        }}
      >
        <GoogleMapReact
          // // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
          defaultCenter={center}
          center={center}
          defaultZoom={11}
        ></GoogleMapReact>
      </Box>
    </>
  );
};

// const Map = ({ center }) => {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         backgroundImage: "url('https://cdn.hswstatic.com/gif/maps.jpg')",
//         // outline: "1px solid blue",
//         position: "absolute"
//       }}
//     >
//     </div>
//   );
// };

export default Map;
