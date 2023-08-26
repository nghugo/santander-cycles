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
    <Box
      sx={{
        pr: { xs: 0, md: 2 },
        position: {md: "absolute"},
        overflow: {md: "auto"},
        width: {md: "100%"},
        height: {md: "100%"},
      }}
    >
      <WeatherDetails />
      <StationDetails
        setSubmitted={setSubmitted}
        values={values}
        stationNames={stationNames}
        setValues={setValues}
        getOnInputChange={getOnInputChange}
        isInvalidInput={isInvalidInput}
        cycleLastUpdatedEpoch={cycleLastUpdatedEpoch}
      />
    </Box>
  );
};

export default Aside;
