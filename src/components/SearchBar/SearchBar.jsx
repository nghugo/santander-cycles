import React from "react";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Autocomplete
      freeSolo
      id="search-bar"
      options={["abc", "def"]}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search Location"
            sx={{
              width: "100%",
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default SearchBar;
