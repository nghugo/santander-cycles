import React from "react";
import { useState, useEffect } from "react";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchString, setSearchString] = useState("");
  const [autocompleteResponse, setAutocompleteResponse] = useState("");

  //     useEffect(() => {
  //     fetch(
  //       "https://api.locationiq.com/v1/autocomplete?" +
  //         new URLSearchParams({
  //             // key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
  //           countrycodes: "gb",
  //           q: {searchString},  // To implement
  //         })
  //     )
  //       .then((response) => {
  //         console.log(response); // TO IMPLEMENT: code for saving fetched results
  //         console.log(response.text());
  //       })
  //       .catch((error) => console.error(error));

  //   }, []); // TO implement

  return (
    <Autocomplete
      id="search-bar"
      freeSolo
      options={["abc", "def"]}
      onInputChange={(e, value) => {
        setSearchString(value);
      }}
      value={searchString || ""}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search Location"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
            }}
            error={() => true}
            helperText={true ? "Invalid input" : " "}
          />
        );
      }}
    />
  );
};

export default SearchBar;
