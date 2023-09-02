import { React, useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

import {
  MapContent,
  MarkerContainer,
  ClusterContainer,
  RouteBannerContainer,
} from "./mapStyles";
import { Paper, Typography, CircularProgress } from "@mui/material";

import PopoverMarker from "./PopoverMarker";
import { ClusterElement, ClusterText } from "./Cluster";

// import google maps library, see https://developers.google.com/maps/documentation/javascript/libraries
((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  // key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  v: "weekly",
});

const Map = ({ stations, routeSubmittedAndValid, values, searchedLatLng }) => {
  const mapref = useRef();
  const directionsService = useRef();
  const directionsRenderer = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);

  // captures the most updated route details, but is not reset on clicking CLEAR ROUTE button
  const [latestRouteDetails, setLatestRouteDetails] = useState({
    duration: null,
    distanceMeters: null,
  });

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
      nbEmptyDocks: station.nbEmptyDocks,
      nbDocks: station.nbDocks,
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
    options: { radius: 150, maxZoom: 20 },
  });

  function getNameMatchingLatLng(value, stations) {
    for (let station of stations) {
      if (value === station.name) {
        return { lat: Number(station.lat), lng: Number(station.long) };
      }
    }
    return { lat: null, lng: null };
  }

  useEffect(() => {
    // Get Route and associated dist, time
    if (mapref.current && routeSubmittedAndValid) {
      console.log(" * * * Called Google Maps Directions API * * *");
      const polylineOptionsActual = new google.maps.Polyline({
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });

      // Only one instance of directionsService and directionsRenderer, enabling deletion of previous route
      // https://stackoverflow.com/questions/32949713/google-map-remove-previous-route-and-draw-a-new-route
      if (!directionsService.current) {
        directionsService.current = new google.maps.DirectionsService();
      }
      if (!directionsRenderer.current) {
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          suppressBicyclingLayer: true,
          polylineOptions: polylineOptionsActual,
        });
      }

      // Get route inputs (set in StationDetails.jsx, states lifted up to App.jsx)
      const origin = getNameMatchingLatLng(values["origin"], stations);
      const destination = getNameMatchingLatLng(
        values["destination"],
        stations
      );

      // Render route on the map by calling Directions API
      directionsRenderer.current.setMap(mapref.current);
      directionsService.current.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // render route on map
            directionsRenderer.current.setDirections(response);
            // extract route distance and duration
            const directionsData = response.routes[0].legs[0];
            if (!directionsData) {
              console.error("error fetching route distance and duration");
            } else {
              setLatestRouteDetails({
                distanceMeters: directionsData.distance.value,
                duration: directionsData.duration.text,
              });
            }
          } else {
            console.error(`error fetching directions}`);
          }
        }
      );
    }
    return () => {
      if (directionsRenderer.current) {
        directionsRenderer.current.setDirections({ routes: [] });
      }
    }; // remove previous route
  }, [routeSubmittedAndValid, values]);

  return (
    <MapContent>
      {/* Display route information conditional on routeSubmittedAndValid */}
      {routeSubmittedAndValid && (
        <RouteBannerContainer>
          <div>
            <Typography variant="body3">
              Route Duration:{" "}
              {latestRouteDetails.duration
                ? latestRouteDetails.duration
                : "N/A"}
            </Typography>
            <Typography variant="body3">
              Route Distance:{" "}
              {latestRouteDetails.distanceMeters
                ? `${
                    Math.round(
                      (latestRouteDetails.distanceMeters * 0.001 +
                        Number.EPSILON) *
                        100
                    ) / 100
                  } km (${
                    Math.round(
                      (latestRouteDetails.distanceMeters * 0.000621371 +
                        Number.EPSILON) *
                        100
                    ) / 100
                  } mi)`
                : "N/A"}
            </Typography>
          </div>
        </RouteBannerContainer>
      )}

      {/* Display rotating roading circle when map is still loading */}
      {!mapref.current && (
        <CircularProgress
          sx={{
            position: "absolute",
            zIndex: "999",
            width: "50px",
            height: "50px",
            top: "50%",
            left: "calc(-25px + 50%)", // position in middle, accounting for width
            pointerEvents: "none",
          }}
        />
      )}

      <GoogleMapReact
        // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }} // not needed when key is provided in google maps import
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }} // London center coordinates
        center={
          searchedLatLng ? searchedLatLng : { lat: 51.509865, lng: -0.118092 }
        } // override defaultCenter -> set dynamically via React state
        defaultZoom={12}
        zoom={searchedLatLng ? 14 : 12} // override defaultZoom -> set dynamically via React state
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapref.current = map;
          map.setOptions({
            clickableIcons: false,
            fullscreenControl: false,
          });
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
        {/* add searched lat lng pin to map if it exists */}
        {searchedLatLng && (
          <MarkerContainer
            lat={searchedLatLng["lat"]}
            lng={searchedLatLng["lng"]}
          >
            <img
              width="20"
              src="src/assets/images/search_pin.png"
              style={{
                paddingBottom: "10px",
                zIndex: "3", // one level higher than PopoverMarker
              }}
            />
          </MarkerContainer>
        )}

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
          return (
            // case: isCluster===false
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
                      <Typography variant="body2">
                        Empty Docks: {cluster.properties.nbEmptyDocks}
                      </Typography>
                      {/* nbEmptyDocks: station., */}
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
