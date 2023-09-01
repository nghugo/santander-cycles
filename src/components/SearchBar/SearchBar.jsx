import React from "react";
import { useState, useEffect } from "react";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchedLatLng, setSearchedLatLng }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteValues, setAutocompleteValues] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const fullnames = autocompleteValues
    ? autocompleteValues.map((entry) => entry.fullname)
    : [];

    
  useEffect(() => {
    // no need to fetch if search term is empty
    if (!searchTerm) {
      setSearchedLatLng(null);
    } else {
      // debounce -> fetch after user has finished typing, rather than on every keystroke
      const delayDebounceFn = setTimeout(() => {
        fetch(
          "https://api.locationiq.com/v1/autocomplete?" +
            new URLSearchParams({
              key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
              countrycodes: "gb",
              format: "json",
              q: searchTerm,
              limit: "6",
              dedupe: "1",
            })
        )
          .then((response) => {
            // handle 404 error differenly than other HTTP error statuses
            if (response.status == 404) {
              setSearchedLatLng(null);
            } else if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            return response.json();
          })
          .then((responseArray) => {
            if (responseArray) {
              const responseArrayExtracted = responseArray.map((entry) => ({
                key: entry.osm_id, // OpenStreetMap id
                lat: Number(entry.lat),
                lng: Number(entry.lon),
                fullname: entry.display_name,
                addressObj: entry.address,
              }));

              // update autocomplete suggestions
              setAutocompleteValues(responseArrayExtracted);
            }

            // update lat lng coordinates if input corresponds to an autocomplete
            // else set null
            (function () {
              for (const [i, v] of autocompleteValues.entries()) {
                if (v.fullname === searchTerm) {
                  setSearchedLatLng({
                    lat: autocompleteValues[i].lat,
                    lng: autocompleteValues[i].lng,
                  });
                  return;
                }
              }
              setSearchedLatLng(null);
            })(); // IIFE to scan through autocompleteValues and find match
          })
          .catch((error) => console.error(error));
      }, 400); // wait for X milliseconds after the user finishes typing (400ms => 30 words per minute)
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <Autocomplete
      id="search-bar"
      freeSolo
      options={fullnames} // To implement: style options differenly than actual value
      onInputChange={(e, value) => {
        setSearchTerm(value);
      }}
      // noOptionsText="No matching location"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
            style={{
              width: "100%",
            }}
            color={searchedLatLng ? "success" : null}
            focused={searchTerm !== ""}
            error={searchTerm !== "" && !searchedLatLng && !isFocused}
            helperText={
              searchTerm && !searchedLatLng ? "Incomplete / Invalid input" : " "
            } // To Implement boolean
          />
        );
      }}
    />
  );
};

export default SearchBar;
