import React from "react";
import { useState, useEffect } from "react";
import { Typography, Card, CircularProgress } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import Cookies from "universal-cookie";

import Toggler from "./Toggler";

const cookies = new Cookies();

function WeatherDetails() {
  cookies.set("celcius", true, { path: "/" });
  const [weather, setWeather] = useState(null);

  const [celcius, setCelcius] = useState("1");
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
    <>
      <Typography variant="h5">Weather Details</Typography>

      <Card elevation={1} sx={{ p: 1 }}>
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
            <p>Current temperature: {weather.current.temp_c}</p>
            <Toggler state={celcius} setState={setCelcius}>
                <ToggleButton value="1">Celcius</ToggleButton>
                <ToggleButton value="0">Fahrenheit</ToggleButton>
            </Toggler>
          </div>
        )}
      </Card>
    </>
  );
}

export default WeatherDetails;
