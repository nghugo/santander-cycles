import React from "react";
import {
  TextField,
  Autocomplete,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import StationCard from "./StationCard";

function StationNameField({
  label,
  id,
  stationNamesSorted,
  onInputChange,
  value,
  invalidInput,
}) {
  return (
    <>
      <Autocomplete
        id={id}
        options={stationNamesSorted}
        noOptionsText="No matching station"
        onInputChange={onInputChange}
        value={value}
        isOptionEqualToValue={(option, value) =>
          value === option || value === ""
        }
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
  stationNamesSorted,
  stations,
  getOnInputChange,
  isInvalidInput,
  cycleLastUpdatedEpoch,
  cycleFetchVersion,
  setCycleFetchVersion,
}) {
  const originStation =
    stations.length > 0
      ? stations.find((entry) => entry.name === values["origin"])
      : null;

  const destinationStation =
    stations.length > 0
      ? stations.find((entry) => entry.name === values["destination"])
      : null;

  return (
    <>
      <Typography variant="h5">Station Details</Typography>

      <Box component="form" noValidate autoComplete="off">
        <StationNameField
          label="Origin (A)"
          id="origin"
          stationNamesSorted={stationNamesSorted}
          onInputChange={getOnInputChange("origin")}
          invalidInput={isInvalidInput("origin")}
          value={values.origin || ""}
        />
        <StationNameField
          label="Destination (B)"
          id="destination"
          stationNamesSorted={stationNamesSorted}
          onInputChange={getOnInputChange("destination")}
          invalidInput={isInvalidInput("destination")}
          value={values.destination || ""}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
          <Button
            type="button"
            onClick={() => setSubmitted(true)}
            variant="contained"
            sx={{ width: "190px", mb: 1, mr: 1, fontWeight: 600 }}
            startIcon={<DirectionsIcon />}
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
            sx={{ width: "190px", mb: 1, mr: 1, fontWeight: 600 }}
            startIcon={<DeleteIcon />}
          >
            Clear Route
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <StationCard station={originStation} prefix="Origin" />
        </Grid>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <StationCard station={destinationStation} prefix="Destination" />
        </Grid>
      </Grid>

      <div>
        <Button
          type="button"
          onClick={() => setCycleFetchVersion(cycleFetchVersion + 1)}
          variant="contained"
          sx={{ width: "190px", mb: 1, mr: 1, fontWeight: 600, color: "white" }}
          startIcon={<RefreshIcon />}
          color="custom1"
        >
          Refresh
        </Button>
      </div>
      
      <div style={{display: "flex", flexWrap: "wrap", width: "100%", marginBottom: "16px"}}>
        <Typography variant="muted" sx={{ m: 0, display: "inline"}}>
          Stations last refreshed:{"\u00A0"}{"\u00A0"}{/* nbsp */}
        </Typography>
        <Typography variant="muted" sx={{ m: 0, display: "inline"}}>
          {cycleLastUpdatedEpoch
            ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString("en-GB")
            : "N/A"}
        </Typography>
      </div>
    </>
  );
}

export default StationDetails;
