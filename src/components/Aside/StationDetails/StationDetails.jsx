import React from "react";
import IconButton from "@mui/material/IconButton";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import Box from "@mui/material/Box";

// import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";

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
            style={{ width: "100%", marginLeft: 0, marginRight: 0 }}
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
}) {
  return (
    <>
      <h1>StationDetails</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
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
        <Button
          type="button"
          variant="contained"
          sx={{ maxWidth: "250px", marginBottom: 1, marginTop: 1 }}
          onClick={() => setSubmitted(true)}
        >
          Set Route
        </Button>

        <Button
          type="button"
          variant="contained"
          color="warning"
          sx={{ maxWidth: "250px", marginBottom: 1, marginTop: 1 }}
          onClick={() => {
            setSubmitted(false);
            setValues({ from: "", to: "" });
          }}
        >
          Clear Route
        </Button>
      </Box>
    </>
  );
}

export default StationDetails;
