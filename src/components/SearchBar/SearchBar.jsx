import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      label="Search Location"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        width: "100%"
      }}
    //   variant="filled"
    />
  );
};

export default SearchBar;
