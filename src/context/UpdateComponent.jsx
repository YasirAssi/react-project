import { Fragment, useContext } from "react";
import CounterSettingContext from "../store/counterContext";
import { Typography, Button } from "@mui/material";

const UpdateContext = () => {
  let { setCounter } = useContext(CounterSettingContext);

  const handleBtnClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <Fragment>
      <Typography variant="h4" color="initial">
        Update Component
      </Typography>
      <Button variant="contained" onClick={handleBtnClick}>
        Increment
      </Button>
    </Fragment>
  );
};

export default UpdateContext;
