import React from "react";
import { useState, useEffect } from "react";
import { Typography, CircularProgress, Paper, Button } from "@mui/material";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import SettingsPopover from "./SettingsPopover";

function getUvCategory(index) {
  if (index <= 2) {
    return "Low";
  } else if (index <= 5) {
    return "Moderate";
  } else if (index <= 7) {
    return "High";
  } else if (index <= 10) {
    return "Very high";
  } else {
    return "Extreme";
  }
}

const Flexdiv = (props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", columnGap: "8px", minWidth:"230px" }}>
      {props.children}
    </div>
  );
};

function WeatherDetails() {
  const [weather, setWeather] = useState(null);

  const celsiusStored = window.localStorage.getItem("celsius")
  const metricStored = window.localStorage.getItem("metric")

  const [celsius, setCelsius] = useState(celsiusStored ? celsiusStored : "1"); // use string, as localStorage stores as string
  const [metric, setMetric] = useState(metricStored ? metricStored : "1"); // use string, as localStorage stores as string
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
          alignItems: "start",
        }}
      >
        <Typography variant="h5">London Weather</Typography>
        <SettingsPopover
          celsius={celsius}
          setCelsius={setCelsius}
          metric={metric}
          setMetric={setMetric}
        />{" "}
        {/* popover */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <img
              width="46px"
              height="auto"
              src={weather.current.condition.icon}
              style={{ position: "relative", top: "2px" }}
            />
            <Typography variant="large">
              {celsius === "1"
                ? weather.current.temp_c + "°C"
                : weather.current.temp_f + "°F"}
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "6px",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "20px",
            }}
          >
            <div>
              <Flexdiv>
                <SentimentSatisfiedOutlinedIcon />
                <Typography variant="body5">
                  Feels like{" "}
                  {celsius === "1"
                    ? weather.current.feelslike_c + "°C"
                    : weather.current.feelslike_f + "°F"}
                </Typography>
              </Flexdiv>
              <Flexdiv>
                <GrainOutlinedIcon />
                <Typography variant="body5">
                  Precipitation:{" "}
                  {metric === "1"
                    ? weather.current.precip_mm + " mm"
                    : weather.current.precip_in + " inches"}
                </Typography>
              </Flexdiv>
              <Flexdiv>
                <WaterDropOutlinedIcon />
                <Typography variant="body5">
                  Humidity: {weather.current.humidity + "%"}
                </Typography>
              </Flexdiv>
            </div>
            <div>
              <Flexdiv>
                <AirOutlinedIcon />
                <Typography variant="body5">
                  Wind speed:{" "}
                  {metric === "1"
                    ? weather.current.wind_kph + " km/h"
                    : weather.current.wind_mph + " miles/h"}
                </Typography>
              </Flexdiv>
              <Flexdiv>
                <VisibilityOutlinedIcon />
                <Typography variant="body5">
                  Visibility:{" "}
                  {metric === "1"
                    ? weather.current.vis_km + " km"
                    : weather.current.vis_miles + " miles"}
                </Typography>
              </Flexdiv>
              <Flexdiv>
                <LightModeOutlinedIcon />
                <Typography variant="body5">
                  UV index: {weather.current.uv} (
                  {getUvCategory(weather.current.uv)})
                </Typography>
              </Flexdiv>
            </div>
          </div>
          <div>
            <Button
              type="button"
              onClick={() => setWeatherFetchVersion(weatherFetchVersion + 1)}
              variant="contained"
              sx={{
                width: "190px",
                mb: 1,
                mr: 1,
                mt: 2,
                fontWeight: 600,
                color: "white",
              }}
              startIcon={<RefreshIcon />}
              color="custom1"
            >
              Refresh
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          >
            <Typography variant="muted">
              Weather last refreshed (server updates every 5 minutes):{"\u00A0"}
            </Typography>
            <Typography variant="muted">
              {new Date(
                parseInt(weather.location.localtime_epoch) * 1000 // convert seconds to milliseconds
              ).toLocaleString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </Typography>
          </div>
        </div>
      )}
    </Paper>
  );
}

export default WeatherDetails;
