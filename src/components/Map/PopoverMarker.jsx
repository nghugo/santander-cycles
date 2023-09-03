import * as React from "react";
import { Popover, ClickAwayListener } from "@mui/material";

export default function PopoverMarker(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startX, setStartX] = React.useState(null);
  const [startY, setStartY] = React.useState(null);

  // separate mouse up vs down to distinguish between click vs drag
  const DELTA = 6;

  const handleMouseDownOrTouchStart = (e) => {
    setStartX(e.type === "touchstart" ? e.touches[0].clientX : e.pageX);
    setStartY(e.type === "touchstart" ? e.touches[0].clientY : e.pageY);
  };

  const handleMouseUpOrTouchEnd = (e) => {
    var diffX;
    var diffY;
    if (e.type === "touchend") {
      diffX = Math.abs(e.changedTouches[0].clientX - startX);
      diffY = Math.abs(e.changedTouches[0].clientY - startY);
    } else {
      diffX = Math.abs(e.pageX - startX);
      diffY = Math.abs(e.pageY - startY);
    }
    if (diffX < DELTA && diffY < DELTA) {
      handleClickNotDrag(e);
    }
  };

  const handleClickNotDrag = (event) => {
    console.log("click detected")
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
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
        onMouseDown={handleMouseDownOrTouchStart}
        onTouchStart={handleMouseDownOrTouchStart}
        onMouseUp={handleMouseUpOrTouchEnd}
        onTouchEnd={handleMouseUpOrTouchEnd}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
          paddingBottom: "10px",
          zIndex: "2", // one level higher than ClusterContainer since you can manually zoom in
        }}
      >
        <img
          width="20"
          // src="src/assets/images/bike_pin.png"
          src="/images/bike_pin.png"
        ></img>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ClickAwayListener
          onClickAway={() => setAnchorEl(null)}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          {props.children}
        </ClickAwayListener>
      </Popover>
    </>
  );
}
