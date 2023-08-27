import React from "react";
import GoogleMapReact from "google-map-react";

import { MapContent } from "./styles";
import { Paper, Typography } from "@mui/material";


const Map = ({ center, stations }) => {
  // return (
  //   <MapContent>
  //     <GoogleMapReact
  //       // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
  //       defaultCenter={center}
  //       center={center}
  //       defaultZoom={10}
  //     >
  //     {stations.length ? (
  //       stations.map((station) => (
  //         <div
  //           // position = {{
  //           //   lat: Number(station.lat),
  //           //   lng: Number(station.long)
  //           // }} 
  //           lat={Number(station.lat)}
  //           lng={Number(station.long)}
  //           key={station.id}
  //         >
  //           {
  //             <Paper elevation={3} sx={{px:1, py:0.2, maxWidth: "155px"}}>
  //               <Typography variant="subtitle1">
  //                 {station.name1}
  //               </Typography>
  //               <Typography variant="subtitle2">
  //                 {station.name2}
  //               </Typography>
  //               <Typography variant="body2">
  //                 Cycles Available: {station.nbBikes}
  //               </Typography>
  //               <Typography variant="muted2">
  //                 Standard: {station.nbStandardBikes}, Electric: {station.nbEBikes}
  //               </Typography>
  //             </Paper>
  //           }
  //         </div>
  //       ))

  //     ): null}
  //     </GoogleMapReact>
  //   </MapContent>
  // );


  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        center={center}
        defaultZoom={10}
      >
        
        <>
          <p lat={Number(51.509865)} lng={Number(0.118092)}>
            hello
          </p>

        </>

        

      </GoogleMapReact>
    </MapContent>
  );



};

export default Map;
