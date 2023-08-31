import React from "react";
import { useState, useEffect } from "react";
import { InputAdornment, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteValues, setAutocompleteValues] = useState([]);
  const [searchLatLng, setSearchLatLng] = useState(null);

  const fullnames = autocompleteValues
    ? autocompleteValues.map((entry) => entry.fullname)
    : [];

  useEffect(() => {
    // no need to fetch if search term is empty
    if (!searchTerm) {
      setSearchLatLng(null);
    } else {
      // debounce -> fetch after user has finished typing, rather than on every keystroke
      const delayDebounceFn = setTimeout(() => {
        console.log(`* ${searchTerm} *`);

        fetch(
          "https://api.locationiq.com/v1/autocomplete?" +
            new URLSearchParams({
              key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
              countrycodes: "gb",
              format: "json",
              q: searchTerm,
              limit: "6",
            })
        )
          .then((response) => {
            if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            return response.json();
          })
          .then((responseArray) => {
            const responseArrayExtracted = responseArray.map((entry) => ({
              lat: Number(entry.lat),
              lng: Number(entry.lon),
              fullname: entry.display_name,
              addressObj: entry.address,
            }));

            // update autocomplete suggestions
            setAutocompleteValues(responseArrayExtracted);

            // update autocomplete suggestions
            if (
              autocompleteValues.length === 1 &&
              searchTerm === autocompleteValues[0].fullname
            ) {
              setSearchLatLng({
                lat: autocompleteValues[0].lat,
                lng: autocompleteValues[0].lng,
              });
            } else {
              setSearchLatLng(null);
            }
          })
          .catch((error) => console.error(error));
      }, 300); // wait for X milliseconds after the user finishes typing
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <Autocomplete
      id="search-bar"
      freeSolo
      //   options={["abc", "def"]}
      options={fullnames} // To implement: style options differenly than actual value
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
