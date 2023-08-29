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
      <Typography variant="muted">
        Stations last refreshed:{" "}
        {cycleLastUpdatedEpoch
          ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString("en-GB")
          : null}
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <StationNameField
          label="Origin (A)"
          id="from"
          stationNames={stationNames}
          onInputChange={getOnInputChange("from")}
          invalidInput={isInvalidInput("from")}
          value={values.from}
        />
        <StationNameField
          label="Destination (B)"
          id="to"
          stationNames={stationNames}
          onInputChange={getOnInputChange("to")}
          invalidInput={isInvalidInput("to")}
          value={values.to}
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
