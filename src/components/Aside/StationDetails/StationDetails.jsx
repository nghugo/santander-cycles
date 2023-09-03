import React from "react";
import {
  TextField,
  Autocomplete,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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
        blurOnSelect
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [snackOpen, setSnackOpen] = React.useState(false);

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setSnackOpen(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }

            setSnackOpen(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Route set and displayed on map!
        </Alert>
      </Snackbar>

      <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, mb: { xs: 4, md: 1 } }}>
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
              onClick={() => {
                setSubmitted(true);
                if (originStation && destinationStation) {
                  setSnackOpen(true);
                }
              }}
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

        <Grid container spacing={2}>
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
            Stations last refreshed (server updates every minute):{"\u00A0"}
          </Typography>
          <Typography variant="muted">
            {cycleLastUpdatedEpoch
              ? new Date(parseInt(cycleLastUpdatedEpoch)).toLocaleString(
                  "en-GB",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "N/A"}
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default StationDetails;
