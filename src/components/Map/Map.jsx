import React from "react";
import GoogleMapReact from "google-map-react";

import { MapContent } from "./styles";
import { Paper, Typography } from "@mui/material";

import PopoverMarker from "./PopoverMarker";

const MarkerContainer = (props) => {
  return <div>{props.children}</div>; // to remove props from container https://github.com/google-map-react/google-map-react/issues/583
};

const Map = ({ center, stations }) => {
  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={11.6}
      >
        {stations.map((station) => (
          <MarkerContainer
            lat={Number(station.lat)}
            lng={Number(station.long)}
            key={station.id}
          >
            <div  // to keep marker centered
              style={{
                width: "50px",
                height: "50px",
                top: "-30px",  // -50px, but +20px to account for 20px paddingBottom of PopoverMarker
                left: "-25px",
                position: "relative",
                bottom: "0",

                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              {/* <img width="20" src="src/assets/images/bike_pin.png"></img> */}
              <PopoverMarker
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
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
              </PopoverMarker>
            </div>
          </MarkerContainer>
        ))}
      </GoogleMapReact>
    </MapContent>
  );
};

export default Map;
