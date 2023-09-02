import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";

import { theme } from "./styles.js";
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Map from "./components/Map/Map";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ origin: "", destination: "" }); // input values
  const [stations, setStations] = useState([]);
  const [cycleLastUpdatedEpoch, setCycleLastUpdatedEpoch] = useState(null);
  const [searchedLatLng, setSearchedLatLng] = useState(null);
  const [cycleFetchVersion, setCycleFetchVersion] = useState(0);

  const stationNamesSorted = stations.map((station) => station.name).sort();

  const routeSubmittedAndValid =
    submitted &&
    stationNamesSorted.includes(values["origin"]) &&
    stationNamesSorted.includes(values["destination"]);

  const getOnInputChange = (name) => {
    return (e, value) => {
      setValues({ ...values, [name]: value });
    };
  };

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
    // fetch santander cycle details
    fetch(
      "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml"
    )
      .then((response) => {
        if (!response.ok) {
          let err = new Error("HTTP status code: " + response.status);
          err.response = response;
          err.status = response.status;
          throw err;
        }
        return response.text();
      })
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
              key: getNode("id", verboseStation),
              name: getNode("name", verboseStation), // full name
              name1: getNode("name", verboseStation).split(", ")[0],
              name2: getNode("name", verboseStation).split(", ")[1],
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
  }, [cycleFetchVersion]);

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
            <Grid item xs={12} md={4} sx={{ position: "relative" }}>
              <Aside
                setSubmitted={setSubmitted}
                values={values}
                stationNamesSorted={stationNamesSorted}
                stations={stations}
                setValues={setValues}
                getOnInputChange={getOnInputChange}
                isInvalidInput={isInvalidInput}
                cycleLastUpdatedEpoch={cycleLastUpdatedEpoch}
                cycleFetchVersion={cycleFetchVersion}
                setCycleFetchVersion={setCycleFetchVersion}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: "90px" }}>
                <SearchBar
                  searchedLatLng={searchedLatLng}
                  setSearchedLatLng={setSearchedLatLng}
                />
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: `calc(-90px + 100%)`, // 100% MINUS the height of the search bar
                }}
              >
                {" "}
                <Map
                  stations={stations}
                  routeSubmittedAndValid={routeSubmittedAndValid}
                  values={values}
                  searchedLatLng={searchedLatLng}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
