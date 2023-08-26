import { React } from "react";

import StationDetails from "./StationDetails/StationDetails";
import WeatherDetails from "./WeatherDetails/WeatherDetails";
import {AsideContent} from "./styles"

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
    <AsideContent>
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
    </AsideContent>
  );
};

export default Aside;
