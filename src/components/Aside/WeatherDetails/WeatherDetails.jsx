import React from "react";
import { useState, useEffect } from "react";
import { Typography, Card, CircularProgress, Paper } from "@mui/material";

import Cookies from "universal-cookie";

import SettingsPopper from "./SettingsPopper";

const cookies = new Cookies();

function WeatherDetails() {
  cookies.set("celsius", true, { path: "/" });
  const [weather, setWeather] = useState(null);

  const [celsius, setCelsius] = useState("1"); // use string, as cookies are stored as string
  const [metric, setMetric] = useState("1"); // use string, as cookies are stored as string
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
        <Typography variant="h5">London Weather</Typography>
        <SettingsPopper
          celsius={celsius}
          setCelsius={setCelsius}
          metric={metric}
          setMetric={setMetric}
        />{" "}
        {/* popper */}
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
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} />
          <p>
            Local Time (Last Refreshed):{" "}
            {new Date(
              parseInt(weather.location.localtime_epoch) * 1000 // convert seconds to milliseconds
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            Temperature:{" "}
            {celsius === "1"
              ? weather.current.temp_c + "°C"
              : weather.current.temp_f + "°F"}
          </p>
          <p>
            Feels Like:{" "}
            {celsius === "1"
              ? weather.current.feelslike_c + "°C"
              : weather.current.feelslike_f + "°F"}
          </p>
          <p>
            Precipitation:{" "}
            {metric === "1"
              ? weather.current.precip_mm + " mm"
              : weather.current.precip_in + " inches"}
          </p>
          <p>Humidity:{" "}
          {weather.current.humidity + "%"}
          </p>
          <p>
            Wind Speed:{" "}
            {metric === "1"
              ? weather.current.wind_kph + " km/h"
              : weather.current.wind_mph + " miles/h"}
          </p>
          <p>
            Visibility:{" "}
            {metric === "1"
              ? weather.current.vis_km + " km"
              : weather.current.vis_miles + " miles"}
          </p>
        </div>
      )}
    </Paper>
  );
}

export default WeatherDetails;
