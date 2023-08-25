import { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Map from "./components/Map/Map";
import Box from "@mui/material/Box";
import { Data } from "@react-google-maps/api";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ from: "", to: "" });

  const [stations, setStations] = useState([]);
  const [lastUpdated_epoch, setlastUpdated_epoch] = useState(null);

  const getOnInputChange = (name) => {
    return (e, value) => {
      setValues({ ...values, [name]: value });
    };
  };

  const stationNamesSorted = stations.map((station) => station.name).sort();
  
  const isInvalidInput = (name) => {
    return submitted && !stationNamesSorted.includes(values[name]); // 
  };

  const KEYMAP = {
    "id": 0,
    "name": 1,
    "terminalName": 2,
    "lat": 3,
    "long": 4,
    "installed": 5,
    "locked": 6,
    "installDate": 7,
    "removalDate": 8,
    "temporary": 9,
    "nbBikes": 10,
    "nbStandardBikes": 11,
    "nbEBikes": 12,
    "nbEmptyDocks": 13,
    "nbDocks": 14,
  }


  useEffect(() => {
    fetch(
      "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml"
    )
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
                
        setlastUpdated_epoch(parseInt(data.firstChild.getAttribute("lastUpdate")));
        
        const getNode = (key, verboseStation) => (verboseStation.childNodes[KEYMAP[key]].childNodes[0].nodeValue)

        setStations(Array.from(data.getElementsByTagName("station")).map((verboseStation) => ({
            id: getNode('id', verboseStation),
            name: getNode('name', verboseStation),
            lat: getNode('lat', verboseStation),
            long: getNode('long', verboseStation),
            nbBikes: getNode('nbBikes', verboseStation),
            nbStandardBikes: getNode('nbStandardBikes', verboseStation),
            nbEBikes: getNode('nbEBikes', verboseStation),
            nbEmptyDocks: getNode('nbEmptyDocks', verboseStation),
            nbDocks: getNode('nbDocks', verboseStation)
        })))
      })
      .catch((error) => console.error(error));
  }, [stations.toString(), lastUpdated_epoch]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ m: 1 }}>
        <Header />
        <Grid container style={{ width: "100%", outline: "1px solid red" }}>
          <Grid item xs={12} md={4}>
            <Aside
              setSubmitted={setSubmitted}
              values={values}
              stationNames={stationNamesSorted} // stations.map((station) => station.name)
              setValues={setValues}
              getOnInputChange={getOnInputChange}
              isInvalidInput={isInvalidInput}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;

