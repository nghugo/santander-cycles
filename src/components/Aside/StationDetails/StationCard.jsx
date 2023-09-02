import React from "react";
import { Card, Typography, Icon } from "@mui/material";

const StationCard = ({ station, prefix }) => {
  if (!station) {
    return (
      <Card elevation={1} sx={{ p: 1, height: "100%"}}>
        <div>
          <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
            {prefix}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: 17 }}>
            Station not set
          </Typography>
        </div>
      </Card>
    );
  }

  return (
    <Card
      elevation={1}
      sx={{
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography variant="subtitle2" sx={{ fontSize: 16, m: 0 }}>
          {prefix}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: 17 }}>
          {station.name}
        </Typography>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: "10px",
            width: "100%",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: 16, display: "inline" }}>
            Cycles Available: {station.nbBikes}
            {"  "}
          </Typography>
          <Typography variant="muted2" sx={{ fontSize: 16, display: "inline" }}>
            Standard: {station.nbStandardBikes}, Electric: {station.nbEBikes}
          </Typography>
        </div>
        <Typography variant="body2" sx={{ fontSize: 16 }}>
          Empty Docks: {station.nbEmptyDocks}
          {"  "}
        </Typography>
      </div>
    </Card>
  );
};

export default StationCard;
