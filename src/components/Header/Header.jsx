import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Typography
          variant="h6"
          sx={{
            px: { xs: 1, sm: 2 },
            py: 1,
            display: "flex",
            fontWeight: 600,
            fontFamily: "RobotoCondensed",
            color: "inherit",
            textDecoration: "none",
            letterSpacing: "0.0075em",
          }}
        >
          Santander Cycles Companion
        </Typography>
        <p>asldjfklsdfj</p>
      </AppBar>
    </>
  );
};

export default Header;
