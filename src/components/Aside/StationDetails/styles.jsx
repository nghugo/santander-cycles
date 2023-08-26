import Button from "@mui/material/Button";

export const SetRouteButton = (props) => (
    <Button
    variant="contained"
    sx={{ width: "170px", mb: 1, mr: 1, fontWeight: 600 }}
    >
        {props.children}
    </Button>
);

// 

export const ClearRouteButton  = (props) => (
    <Button
    variant="contained"
    color="secondary"
    sx={{ width: "170px", mb: 1, mr: 1, fontWeight: 600 }}
    >
        {props.children}
    </Button>
);
