import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const Toggler = (props) => {
  const handleChange = (event, newState) => {
    // only set state if not null
    if (newState !== null) {
      console.log(newState);
      console.log(props.setState.isPrototypeOf());

      props.setState(newState);
    }
  };

  return (
    <ToggleButtonGroup
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
