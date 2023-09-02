import React from "react";
import { useState } from "react";
import { Box, Popper, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ToggleButton from "@mui/material/ToggleButton";
import Toggler from "./Toggler";

export default function SettingsPopper({celcius, setCelcius}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <div>
        <IconButton
          aria-describedby={id}
          aria-label="weather settings"
          color="primary"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <Toggler state={celcius} setState={setCelcius}>
              <ToggleButton value="1">Celcius</ToggleButton>
              <ToggleButton value="0">Fahrenheit</ToggleButton>
            </Toggler>
          </Box>
        </Popper>
      </div>
    </>
  );
}
