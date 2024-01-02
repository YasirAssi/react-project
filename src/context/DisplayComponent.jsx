import { Fragment, useContext } from "react";
import CounterSettingContext from "../store/counterContext";
import Typography from "@mui/material/Typography";

const DisplayContext = () => {
  let { counter } = useContext(CounterSettingContext);
  return (
    <Fragment>
      <Typography variant="h4" color="initial">
        Display Component
      </Typography>
      <Typography variant="h4" color="initial">
        {counter}
      </Typography>
    </Fragment>
  );
};

export default DisplayContext;
