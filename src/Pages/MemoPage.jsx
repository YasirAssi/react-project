import { Fragment, useCallback, useState } from "react";
import ButtonComponent1 from "../components/ButtonComponent1";
import TextField from "@mui/material/TextField";

const MemoPage = () => {
  const [txt, setTxt] = useState("");
  const handleTxtChange = (e) => {
    setTxt(e.target.value);
  };
  const handleBtnClick = useCallback(() => {
    console.log("you click on the btn");
  }, []);
  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={txt}
        onChange={handleTxtChange}
      />
      <ButtonComponent1 color="primary" onClick={handleBtnClick}>
        Click me
      </ButtonComponent1>
    </Fragment>
  );
};

export default MemoPage;
