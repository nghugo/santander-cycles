import React from "react";
import { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  Autocomplete,
  Typography,
  Box,
  Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchedLatLng, setSearchedLatLng }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteValues, setAutocompleteValues] = useState([]);
  const [open, setOpen] = useState(false); // whether search bar popper is open

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
              format: "json",
              q: searchTerm,
              limit: "6",
              dedupe: "1",
              countrycodes: "gb", // restrict results to Great Britian
              viewbox: "0.1009,51.5806,-0.3420,51.4265", // searcharable coordinate area representing London (order: max lon, max lat, min lon, min lat as specified in docs)
              bounded: "1", // restrict results to the London area
            })
        )
          .then((response) => {
            // handle 404 error differently than other HTTP error statuses
            if (response.status == 404) {
              console.log("* 404 response status *");
              setSearchedLatLng(null);
              return [];
            } else if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            return response.json();
          })
          .then((responseArray) => {
            if (responseArray.length > 0) {
              const responseArrayExtracted = responseArray.map((entry) => ({
                key: entry.osm_id, // OpenStreetMap id
                lat: Number(entry.lat),
                lng: Number(entry.lon),
                fullname: entry.display_name,
                addressObj: entry.address,
              }));

              // update autocomplete suggestions
              setAutocompleteValues(responseArrayExtracted);

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
            } else {
              setAutocompleteValues([]);
            }
          })
          .catch((error) => console.error(error));
      }, 400); // wait for X milliseconds after the user finishes typing (400ms => 30 words per minute)
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    // <ClickAwayListener
    //   onClickAway={() => setOpen(false)}
    //   mouseEvent="onMouseDown"
    //   touchEvent="onTouchStart"
    // >
    <Autocomplete
      id="search-bar"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      filterOptions={(options) => options} // prevent Autocomplete from filtering options internally https://stackoverflow.com/questions/62323166/material-ui-autocomplete-not-updating-options
      options={fullnames}
      noOptionsText="No matching location"
      onInputChange={(e, value) => {
        setSearchTerm(value);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      blurOnSelect
      value={searchTerm || ""}
      sx={{ mt: 1 }}
      PopperComponent={(props) => (
        <Popper
          {...props}
          modifiers={[
            {
              name: "flip",
              options: {
                fallbackPlacements: [],
              },
            },
          ]}
          popperOptions={{
            placement: "bottom",
          }}
        />
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search London"
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
            error={searchTerm !== "" && !searchedLatLng && !open}
            helperText={
              searchTerm && !searchedLatLng ? "Incomplete / Invalid input" : " "
            }
          />
        );
      }}
      renderOption={(props, option) => {
        const matchingAutocompleteValue = autocompleteValues.find(
          (entry) => entry.fullname === option
        );

        const getValuecommaOrValueorEmptystring = (
          matchingAutocompleteValue,
          key
        ) => {
          if (key in matchingAutocompleteValue.addressObj) {
            return (
              <Typography
                variant="body4"
                sx={{
                  "&::after": {
                    content: '", "',
                  },
                  "&:last-of-type::after": {
                    display: "none",
                  },
                }}
              >
                {matchingAutocompleteValue.addressObj[key]}
              </Typography>
            );
          } else {
            return null;
          }
        };

        return (
          <li {...props}>
            <Box sx={{ display: "flex", flexDirection: "column", py: 0.5 }}>
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                    padding: 0,
                    margin: 0,
                    lineHeight: "18px",
                    paddingBottom: "2px",
                  }}
                >
                  {matchingAutocompleteValue.addressObj.name}
                </Typography>
              </div>
              <div>
                <div style={{ paddingBottom: "2px", lineHeight: "16px" }}>
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "road"
                  )}
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "city"
                  )}
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "county"
                  )}
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "state"
                  )}
                </div>
                <div style={{ padding: 0, lineHeight: "16px" }}>
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "postcode"
                  )}
                  {getValuecommaOrValueorEmptystring(
                    matchingAutocompleteValue,
                    "country"
                  )}
                </div>
              </div>
            </Box>

            {/* name road city county state postcode country */}
          </li>
        );
      }}
    />
    // </ClickAwayListener>
  );
};

export default SearchBar;
