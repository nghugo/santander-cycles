import React from "react";
import { useState, useEffect } from "react";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteResponse, setAutocompleteResponse] = useState("");

  useEffect(() => {
    // no need to fetch if search term is empty
    if (searchTerm) {
        // debounce -> fetch after user has finished typing, rather than on every keystroke
        const delayDebounceFn = setTimeout(() => {
          console.log(`* ${searchTerm} *`);
          fetch(
            "https://api.locationiq.com/v1/autocomplete?" +
              new URLSearchParams({
                //  key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
                countrycodes: "gb",
                format: "json",
                q: { searchTerm },
              })
          )
            .then((response) => {
              console.log(response); // TO IMPLEMENT: code for saving fetched results
              console.log(response.text());
            })
            .catch((error) => console.error(error));
        }, 3000);
        return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <Autocomplete
      id="search-bar"
      freeSolo
      options={["abc", "def"]}
      onInputChange={(e, value) => {
        setSearchTerm(value);
      }}
      value={searchTerm || ""}
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
            error={true} // To Implement boolean
            helperText={true ? "Invalid input" : " "} // To Implement boolean
          />
        );
      }}
    />
  );
};

export default SearchBar;
