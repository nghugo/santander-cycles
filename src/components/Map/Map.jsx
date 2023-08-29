import { React, useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

import { MapContent, MarkerContainer, ClusterContainer } from "./mapStyles";
import { Paper, Typography } from "@mui/material";

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
  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  v: "weekly",
});



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

  // function calcRoute(map, directionsService, directionsRenderer) {
  //   // // TO IMPLEMENT: grab src and dest from state
  //   // const src = document.getElementById('src').value
  //   // const dest = document.getElementById('dest').value

  //   const src = {
  //     lat: 51.478207, lng: -0.232061,
  //   };
  //   const dest = {
  //     lat: 51.556532, lng: 0.027395,
  //   };

  //   const request = {
  //     origin: src,
  //     destination: dest,
  //     travelMode: "BICYCLING",
  //   };

  //   directionsService.route(request, function (result, status) {
  //     if (status == "OK") {
  //       directionsRenderer.setDirections(result); // render on map
  //       console.log(result)
  //     }
  //   });
  // }

  // function DirectionsRenderer(props) {
  //   async function getRoute(origin, destination) {
  //     const directionsService = new google.maps.DirectionsService()
  //     return new Promise(function(resolve, reject) {
  //       directionsService.route(
  //         {
  //           origin: origin,
  //           destination: destination,
  //           travelMode: google.maps.TravelMode.DRIVING
  //         },
  //         (result, status) => {
  //           if (status === google.maps.DirectionsStatus.OK) {
  //             resolve(result)
  //           } else {
  //             reject(result)
  //           }
  //         }
  //       )
  //     })
  //   }
  
  //   async function renderRoute() {
  //     const directions = await getRoute(props.origin, props.destination)
  //     const directionsRenderer = new google.maps.DirectionsRenderer()
  //     directionsRenderer.setMap(props.map)
  //     directionsRenderer.setDirections(directions)
  //   }
  
  //   useEffect(() => {
  //     renderRoute().catch(err => {
  //       console.log(err)
  //     })
  //   }, [])
  
  //   return null
  // }

  return (
    <MapContent>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapref.current = map;
          map.setOptions({ clickableIcons: false });
          
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(map)
          const origin = { lat: 51.478207, lng: -0.232061 };
          const destination = { lat: 51.556532, lng: 0.027395 }

          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.BICYCLING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );

          // if (true) { // TO IMPLEMENT: use prop of validRouteIsGiven
          //   console.log("Route is being calculated")
          //   calcRoute(map, directionsService, directionsRenderer)
          //   console.log("Route calculated")
          // }  // TO IMPLEMENT: else clear route  
        }
      } 

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
        {/* <DirectionsRenderer
            map={mapref}
            origin={{ lat: 51.478207, lng: -0.232061, }}
            destination={{ lat: 51.556532, lng: 0.027395 }}
          /> */}
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
