import React from "react";
import { useState } from "react";
import { Card, Popover, IconButton, ClickAwayListener } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ToggleButton from "@mui/material/ToggleButton";
import Toggler from "./Toggler";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SettingsPopover({
  celsius,
  setCelsius,
  metric,
  setMetric,
}) {
  const theme = useTheme();
  const aboveSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div>
        <IconButton
          aria-describedby={id}
          aria-label="weather settings"
          color="primary"
          onClick={handleClick}
          sx={{
            pt: 0,
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handleClose}
          disableAutoFocus
        >
          <ClickAwayListener
            onClickAway={() => setAnchorEl(null)}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <Card
              elevation={24}
              sx={{
                px: { xs: 1, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                bgcolor: "background.paper",
                outline: "1px solid slategrey",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                rowGap: 1.5,
                minWidth: { xs: "200px", sm: "350px" },
              }}
            >
              <Toggler
                localStorageItemKey="celsius"
                state={celsius}
                setstate={setCelsius}
                sx={{ width: "100%" }}
                orientation={aboveSm ? "horizontal" : "vertical"}
              >
                <ToggleButton
                  value="1"
                  sx={{ width: { xs: "100%", sm: "50%" } }}
                >
                  Celsius
                </ToggleButton>
                <ToggleButton
                  value="0"
                  sx={{ width: { xs: "100%", sm: "50%" } }}
                >
                  Fahrenheit
                </ToggleButton>
              </Toggler>
              <Toggler
                localStorageItemKey="metric"
                state={metric}
                setstate={setMetric}
                sx={{ width: "100%" }}
                orientation={aboveSm ? "horizontal" : "vertical"}
              >
                <ToggleButton
                  value="1"
                  sx={{ width: { xs: "100%", sm: "50%" } }}
                >
                  Metric
                </ToggleButton>
                <ToggleButton
                  value="0"
                  sx={{ width: { xs: "100%", sm: "50%" } }}
                >
                  Imperial
                </ToggleButton>
              </Toggler>
            </Card>
          </ClickAwayListener>
        </Popover>
      </div>
    </>
  );
}
