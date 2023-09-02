import React from "react";
import { useState, useEffect } from "react";
import { Typography, Card, CircularProgress, Paper } from "@mui/material";

import Cookies from "universal-cookie";

import SettingsPopper from "./SettingsPopper";

const cookies = new Cookies();

function WeatherDetails() {
  cookies.set("celcius", true, { path: "/" });
  const [weather, setWeather] = useState(null);

  const [celcius, setCelcius] = useState("1"); // use string, as cookies are stored as string
  const [weatherFetchVersion, setWeatherFetchVersion] = useState(0);

  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/current.json?" +
        new URLSearchParams({
          key: import.meta.env.VITE_WEATHER_API_KEY,
          q: "London",
        })
    )
      .then((response) => {
        if (!response.ok) {
          let err = new Error("HTTP status code: " + response.status);
          err.response = response;
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((responseJSON) => setWeather(responseJSON))
      .catch((error) => console.error(error));
  }, [weatherFetchVersion]);

  return (
    <Paper elevation={3} sx={{ p: 2, mt: { xs: 3, md: 1 }, mb: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Weather Details</Typography>
        <SettingsPopper celcius={celcius} setCelcius={setCelcius}/>
      </div>

      {/* Display rotating circle when weather is still loading */}
      {!weather && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "180px",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {/* Display weather information when weather has finished loading */}
      {weather && (
        <div>
          <p>Current temperature: {celcius==="1" ? weather.current.temp_c : weather.current.temp_f}</p>
          <p>{weather.current.temp_c}</p>
          <p>{weather.current.temp_f}</p>
        </div>
      )}
      
    </Paper>
  );
}

export default WeatherDetails;
