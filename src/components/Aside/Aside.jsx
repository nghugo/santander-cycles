import { React, useState } from "react";
import Box from "@mui/material/Box";

import StationDetails from "./StationDetails/StationDetails";
import WeatherDetails from "./WeatherDetails/WeatherDetails";

const Aside = ({
  setSubmitted,
  values,
  setValues,
  stationNames,
  getOnInputChange,
  isInvalidInput,
  cycleLastUpdatedEpoch,
}) => {
  return (
    <Box sx={{ mr: { xs: 0, md: 2 } }}>
      <WeatherDetails />
      <p>
        Cycle Availabilities Last Refreshed:{" "}
        {cycleLastUpdatedEpoch
          ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString()
          : null}
      </p>
      <StationDetails
        setSubmitted={setSubmitted}
        values={values}
        stationNames={stationNames}
        setValues={setValues}
        getOnInputChange={getOnInputChange}
        isInvalidInput={isInvalidInput}
      />
    </Box>
  );
};

export default Aside;
