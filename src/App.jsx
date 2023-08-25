import { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Map from "./components/Map/Map";
import Box from "@mui/material/Box";
import { Data } from "@react-google-maps/api";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#FF5722",
    },
    cardBackground: {
      main: "#eff6f9",
    },
  },
});

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ from: "", to: "" });

  const [stations, setStations] = useState([]);
  const [cycleLastUpdatedEpoch, setCycleLastUpdatedEpoch] = useState(null);

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
    id: 0,
    name: 1,
    terminalName: 2,
    lat: 3,
    long: 4,
    installed: 5,
    locked: 6,
    installDate: 7,
    removalDate: 8,
    temporary: 9,
    nbBikes: 10,
    nbStandardBikes: 11,
    nbEBikes: 12,
    nbEmptyDocks: 13,
    nbDocks: 14,
  };

  useEffect(() => {
    fetch(
      "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml"
    )
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        setCycleLastUpdatedEpoch(
          parseInt(data.firstChild.getAttribute("lastUpdate"))
        );

        const getNode = (key, verboseStation) =>
          verboseStation.childNodes[KEYMAP[key]].childNodes[0].nodeValue;

        setStations(
          Array.from(data.getElementsByTagName("station")).map(
            (verboseStation) => ({
              id: getNode("id", verboseStation),
              name: getNode("name", verboseStation),
              lat: getNode("lat", verboseStation),
              long: getNode("long", verboseStation),
              nbBikes: getNode("nbBikes", verboseStation),
              nbStandardBikes: getNode("nbStandardBikes", verboseStation),
              nbEBikes: getNode("nbEBikes", verboseStation),
              nbEmptyDocks: getNode("nbEmptyDocks", verboseStation),
              nbDocks: getNode("nbDocks", verboseStation),
            })
          )
        );
      })
      .catch((error) => console.error(error));
  }, [stations.toString(), cycleLastUpdatedEpoch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Header />
        <Box sx={{ m: { xs: 1, sm: 2, flex: 1, position: "relative" } }}>
          <Grid
            container
            style={{ width: "100%", height: "100%", position: "absolute" }}
          >
            <Grid item xs={12} md={4}>
              <Aside
                setSubmitted={setSubmitted}
                values={values}
                stationNames={stationNamesSorted} // stations.map((station) => station.name)
                setValues={setValues}
                getOnInputChange={getOnInputChange}
                isInvalidInput={isInvalidInput}
                cycleLastUpdatedEpoch={cycleLastUpdatedEpoch}
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{ position: "relative" }}>
              <Map center={{ lat: 51.5074, lng: -0.1272 }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
