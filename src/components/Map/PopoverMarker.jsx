import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PopoverMarker(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation(); // do not propagate to google maps's santander cycle button
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        aria-describedby={id}
        onClick={handleClick}
        style={{
          cursor: "pointer",
          outline: "1px solid red",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
          paddingBottom: "20px",
        }}
      >
        <img width="20" src="src/assets/images/bike_pin.png"></img>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={props.anchorOrigin}
        transformOrigin={props.transformOrigin}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        {props.children}
      </Popover>
    </>
  );
}
