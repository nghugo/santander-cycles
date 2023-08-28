import { React, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

import { MapContent, MarkerContainer, ClusterContainer } from "./mapStyles";
import { Paper, Typography } from "@mui/material";

import PopoverMarker from "./PopoverMarker";
import { ClusterElement, ClusterText } from "./Cluster";

const Map = ({ stations }) => {
  const mapref = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);

  const points = stations.map((station) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: station.id,
      name1: station.name1,
      name2: station.name2,
      nbBikes: station.nbBikes,
      nbStandardBikes: station.nbStandardBikes,
      nbEBikes: station.nbEBikes,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(station.long), parseFloat(station.lat)],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapref.current = map;
          map.setOptions({ clickableIcons: false });
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster, index) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointcount } =
            cluster.properties;

          if (isCluster) {
            return (
              <ClusterContainer lat={lat} lng={lng} key={index}>
                <ClusterElement
                  pointcount={pointcount}
                  pointslength={points.length}
                  mapref={mapref}
                  supercluster={supercluster}
                  clusterid={cluster.id}
                  lat={lat}
                  lng={lng}
                >
                  <ClusterText>{pointcount}</ClusterText>
                </ClusterElement>
              </ClusterContainer>
            );
          }

          // case: isCluster===false
          return (
            <MarkerContainer lat={lat} lng={lng} key={index}>
              {/* cluster.properties.id */}
              <PopoverMarker>
                <Paper
                  elevation={3}
                  sx={{ px: 1, py: 0.2, maxWidth: "200px" }}
                  lat={lat}
                  lng={lng}
                >
                  {
                    <>
                      <Typography variant="subtitle1">
                        {cluster.properties.name1}
                      </Typography>
                      <Typography variant="subtitle2">
                        {cluster.properties.name2}
                      </Typography>
                      <Typography variant="body2">
                        Cycles Available: {cluster.properties.nbBikes}
                      </Typography>
                      <Typography variant="muted2">
                        Standard: {cluster.properties.nbStandardBikes},
                        Electric: {cluster.properties.nbEBikes}
                      </Typography>
                    </>
                  }
                </Paper>
              </PopoverMarker>
            </MarkerContainer>
          );
        })}
      </GoogleMapReact>
    </MapContent>
  );
};

export default Map;
