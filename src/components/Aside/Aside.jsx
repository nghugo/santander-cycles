import { React, useState } from "react";
import StationDetails from "./StationDetails/StationDetails";
import WeatherDetails from "./WeatherDetails/WeatherDetails";

const Aside = ({
  setSubmitted,
  values,
  setValues,
  stationNames,
  getOnInputChange,
  isInvalidInput,
}) => {
  // should fetch from App.jsx to avoid waterfall
  return (
    <>
      <WeatherDetails />
      <StationDetails
        setSubmitted={setSubmitted}
        values={values}
        stationNames={stationNames}
        setValues={setValues}
        getOnInputChange={getOnInputChange}
        isInvalidInput={isInvalidInput}
      />
    </>
  );
};

export default Aside;
