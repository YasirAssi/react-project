import { Fragment, useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import ComponentToKillComponent from "../ComponentToKillComponent";

const LifeCycleHooksPage = () => {
  const [show, setShow] = useState(true);

  const [count, setCount] = useState(() => {
    console.log("initial state");
    return 0;
  });
  useEffect(() => {
    /* will work every time state update */
    console.log("useEffect");
  });
  useEffect(() => {
    /* will work only one time and after the component ready */
    console.log("useEffect with []");
  }, []);
  useEffect(() => {
    console.log("count from useEffect 3", count);
  }, [count]);
  const handleBtnClick = () => {
    setCount((currentCount) => currentCount + 1);
    console.log("count from handleBtnClick", count);
  };
  console.log("from logic");

  const handleToggleBtnClick = () => {
    setShow(!show);
  };

  return (
    <Fragment>
      {console.log("from html")}
      <Button variant="contained" onClick={handleBtnClick}>
        +1
      </Button>
      <Typography>LifeCycleHooksPage, count: {count}</Typography>
      <Button variant="contained" onClick={handleToggleBtnClick}>
        toggle
      </Button>
      {show && <ComponentToKillComponent />}
    </Fragment>
  );
};

export default LifeCycleHooksPage;
