import * as React from "react";
import { Box, Popper, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SettingsPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        aria-label="weather settings"
        color="primary"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box>
      </Popper>
    </div>
  );
}
