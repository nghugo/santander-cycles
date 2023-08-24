import { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import List from "./components/Aside/Aside";
import Map from "./components/Map/Map";
import Box from "@mui/material/Box";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />
      <Box sx={{ m: 1 }}>
        <Header />
        <Grid container style={{ width: "100%", outline: "1px solid red" }}>
          <Grid item xs={12} md={4}>
            <List />
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
