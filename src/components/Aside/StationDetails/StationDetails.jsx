import { React, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import Box from "@mui/material/Box";

// import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";

function StationField({ label, id, options, onInputChange, value, submitted}) {
  const invalidInput = submitted && !options.includes(value);
  return (
    <>
      <Autocomplete
        id={id}
        freeSolo
        options={options}
        onInputChange={onInputChange}
        value={value}
        
        renderInput={(params) => <TextField 
          {...params} 
          label={label}
          error={invalidInput}
          style={{ width: "100%", marginLeft: 0, marginRight: 0 }}
          helperText={invalidInput ? "Invalid input" : " "}
        />}
      />
    </>
  );
}

function StationDetails() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({from: "", to:""})

  const getOnInputChange = (name) => {
    return (e, value) => {
      setValues({ ...values, [name]: value });
    };
  };

  const options = ["abc", "def"]; // FILL IN WITH FETCHED BIKE STANDS LATER
  // should fetch from App.jsx to avoid waterfall

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
        <StationField
          label="From"
          id="from"
          options={options}
          submitted={submitted}
          onInputChange={getOnInputChange('from')}
          value={values.from}
        />
        <StationField
          label="To"
          id="to"
          options={options}
          submitted={submitted}
          onInputChange={getOnInputChange('to')}
          value={values.to}

        />
        <Button
          type="button"
          variant="contained"
          sx={{ maxWidth: "250px", marginBottom: 1, marginTop: 1}}
          onClick={() => setSubmitted(true)}
        >
          Set Route
        </Button>

        <Button
          type="button"
          variant="contained"
          color="warning"
          sx={{ maxWidth: "250px", marginBottom: 1, marginTop: 1}}
          onClick={() => {
            setSubmitted(false)
            setValues({from: "", to: ""});
          }}
        >
          Clear Route
        </Button>
      </Box>
    </>
  );
}

export default StationDetails;
