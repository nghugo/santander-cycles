import { React, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

import { MapContent, MarkerContainer, ClusterContainer } from "./styles";
import { Paper, Typography } from "@mui/material";

import PopoverMarker from "./PopoverMarker";

const Map = ({ stations }) => {
  const mapRef = useRef();
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

  console.log(clusters);

  return (
    <MapContent>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
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
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <ClusterContainer lat={lat} lng={lng} key={index}>
                <div
                  style={{
                    outline: "1px solid white",
                    width: `${30 + (pointCount / points.length) * 30}px`,
                    height: `${30 + (pointCount / points.length) * 30}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    backgroundColor: "#1976D2",
                    cursor: "pointer",
                    zIndex: "1" // one level higher than regular elements
                  }}
                  onClick={(event) => {
                    event.stopPropagation(); // do not propagate to google maps's santander cycle button
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: lat, lng: lng });
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    {pointCount}
                  </p>
                </div>
              </ClusterContainer>
            );
          }

          // for the following, isCluster===false
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
