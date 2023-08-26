import React from "react";
import {TextField, Autocomplete, Typography, Box} from "@mui/material";

import { ClearRouteButton, SetRouteButton } from "./styles"

function StationNameField({
  label,
  id,
  stationNames,
  onInputChange,
  value,
  invalidInput,
}) {
  return (
    <>
      <Autocomplete
        id={id}
        freeSolo
        options={stationNames}
        onInputChange={onInputChange}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={invalidInput}
            style={{ width: "100%", m: 0 }}
            helperText={invalidInput ? "Invalid input" : " "}
          />
        )}
      />
    </>
  );
}

function StationDetails({
  setSubmitted,
  values,
  setValues,
  stationNames,
  getOnInputChange,
  isInvalidInput,
  cycleLastUpdatedEpoch,
}) {
  return (
    <>
      <Typography variant="h5">Station Details</Typography>
      <Typography variant="body2" sx={{my: 2}}>
        Stations last refreshed:{" "}
        {cycleLastUpdatedEpoch
          ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString("en-GB")
          : null}
      </Typography>
        
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <StationNameField
          label="From"
          id="from"
          stationNames={stationNames}
          onInputChange={getOnInputChange("from")}
          invalidInput={isInvalidInput("from")}
          value={values.from}
        />
        <StationNameField
          label="To"
          id="to"
          stationNames={stationNames}
          onInputChange={getOnInputChange("to")}
          invalidInput={isInvalidInput("to")}
          value={values.to}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
          <SetRouteButton
            type="button"
            onClick={() => setSubmitted(true)}
          >
            Set Route
          </SetRouteButton>

          <ClearRouteButton
            type="button"
            onClick={() => {setSubmitted(false); setValues({ from: "", to: "" });}}
          >
            Clear Route
          </ClearRouteButton>
        </Box>
      </Box>
    </>
  );
}

export default StationDetails;
