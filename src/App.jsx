import { useState } from 'react'
import { CssBaseline, Grid } from '@mui/material';

import Header from "./components/Header/Header";
import List from "./components/Aside/Aside";
import Map from "./components/Map/Map";
import StationDetails from "./components/StationDetails/StationDetails";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width:'100%', outline:'1px solid red' }} >
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  )
}

export default App
