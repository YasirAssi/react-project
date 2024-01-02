import { Fragment } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ROUTES from "../../routes/ROUTES";

const CardsExample = () => {
  return (
    <Stack>
      <Link to={`${ROUTES.EDITCARD}/asas0`}>card1</Link>
      <Link to={`${ROUTES.EDITCARD}/asas1`}>card2</Link>
      <Link to={`${ROUTES.EDITCARD}/asas2`}>card3</Link>
      <Link to={`${ROUTES.EDITCARD}/asas3`}>card4</Link>
      <Link to={`${ROUTES.EDITCARD}/asas4`}>card5</Link>
    </Stack>
  );
};

export default CardsExample;
