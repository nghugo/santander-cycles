import React from "react";
import GoogleMapReact from "google-map-react";

import { MapContent } from "./styles";
import { Paper, Typography } from "@mui/material";

const Marker = (props) => {
  <div {...props}>
    {props.children}
  </div>
}

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

  //   return (
  //     <MapContent>
  //       <GoogleMapReact
  //         // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
  //         defaultCenter={{ lat: 51.5074, lng: -0.1272 }}
  //         defaultZoom={10}
  //       >
  //         <p
  //           lat={Number(51.509865)}
  //           lng={Number(0.118092)}
  //           style={{
  //             color: "white",
  //             background: "grey",
  //             padding: "15px 10px",
  //             borderRadius: "100%",

  //             // textAlign: "center",
  //             // alignItems: "center",
  //             // justifyContent: "center",
  //             display: "inline-flex", // important to keep center for visuals
  //             transform: "translate(-50%, -50%)", // important to keep center for visuals
  //           }}
  //         >
  //           hello
  //         </p>

  //         <p
  //           lat={Number(51.509865)}
  //           lng={Number(0)}
  //           style={{
  //             color: "white",
  //             background: "grey",
  //             padding: "15px 10px",
  //             borderRadius: "100%",

  //             // textAlign: "center",
  //             // alignItems: "center",
  //             // justifyContent: "center",
  //             display: "inline-flex", // important to keep center for visuals
  //             transform: "translate(-50%, -50%)", // important to keep center for visuals
  //           }}
  //         >
  //           Bye
  //         </p>

  //       </GoogleMapReact>
  //     </MapContent>
  //   );
  // };

  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={11.6}
      >
        {stations.map((station) => (
          <div
            lat={Number(station.lat)}
            lng={Number(station.long)}
            key={station.id}
            style={{
              outline: "1px solid red",
              width: "50px",
              height: "50px",
              top: "-50px",
              left: "-25px",
              position: "relative",
              bottom: "0",
              
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <p
            style={{
              outline: "1px solid blue",
              margin: 0,
            }}
            >V</p>
          </div>
        ))}

        {/* {stations.length
          ? stations.map((station) => (
              <Paper
                elevation={3}
                sx={{ px: 1, py: 0.2, maxWidth: "155px" }}
                lat={Number(station.lat)}
                lng={Number(station.long)}
                key={station.id}
              >
                {
                  <>
                    <Typography variant="subtitle1">{station.name1}</Typography>
                    <Typography variant="subtitle2">{station.name2}</Typography>
                    <Typography variant="body2">
                      Cycles Available: {station.nbBikes}
                    </Typography>
                    <Typography variant="muted2">
                      Standard: {station.nbStandardBikes}, Electric:{" "}
                      {station.nbEBikes}
                    </Typography>
                  </>
                }
              </Paper>
            ))
          : null}
        ; */}
      </GoogleMapReact>
    </MapContent>
  );
};

export default Map;
