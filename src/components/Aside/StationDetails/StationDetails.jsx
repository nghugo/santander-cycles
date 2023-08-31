import React from "react";
import { TextField, Autocomplete, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";

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
            sx={{ width: "100%", m: 0 }}
            helperText={invalidInput ? "Invalid input" : " "}
            variant="filled"
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
      <Typography variant="muted">
        Stations last refreshed:{" "}
        {cycleLastUpdatedEpoch
          ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString("en-GB")
          : "N/A"}
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <StationNameField
          label="Origin (A)"
          id="origin"
          stationNames={stationNames}
          onInputChange={getOnInputChange("origin")}
          invalidInput={isInvalidInput("origin")}
          value={values.origin || ""}
        />
        <StationNameField
          label="Destination (B)"
          id="destination"
          stationNames={stationNames}
          onInputChange={getOnInputChange("destination")}
          invalidInput={isInvalidInput("destination")}
          value={values.destination || ""}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
          <Button
            type="button"
            onClick={() => setSubmitted(true)}
            variant="contained"
            sx={{ width: "170px", mb: 1, mr: 1, fontWeight: 600 }}
          >
            Set Route
          </Button>

          <Button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setValues({ from: "", to: "" });
            }}
            variant="contained"
            color="secondary"
            sx={{ width: "170px", mb: 1, mr: 1, fontWeight: 600 }}
          >
            Clear Route
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default StationDetails;
