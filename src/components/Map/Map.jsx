import React from "react";
import GoogleMapReact from "google-map-react";

import { MapContent } from "./styles"

const Map = ({ center }) => {
  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        center={center}
        defaultZoom={11}
      ></GoogleMapReact>
    </MapContent>
  );
};

export default Map;
