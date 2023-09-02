import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Toggler = (props) => {
  const handleChange = (event, newState) => {
    // only set state if not null
    if (newState !== null) {
      props.setstate(newState);
    }
  };

  return (
    <ToggleButtonGroup
      {...props}
      color="primary"
      value={props.state}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {props.children}
    </ToggleButtonGroup>
  );
};

export default Toggler;
