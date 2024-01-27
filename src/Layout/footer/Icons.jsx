import { Box } from "@mui/material";
import {
  alwaysButtons,
  loggedInButtons,
  bizButtons,
  adminButtons,
} from "./myButtons";
import FooterComponent from "./FooterComponent";
import { useContext } from "react";
import LogInContext from "../../store/loginContext";

const Buttons = () => {
  const { logIn } = useContext(LogInContext);
  const loggedIn = logIn;
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysButtons.map((myItem, index) => (
        <FooterComponent to={myItem.to} key={"ButtonsNav" + index}>
          {myItem.children}
        </FooterComponent>
      ))}
      {loggedIn &&
        loggedInButtons.map((myItem, index) => (
          <FooterComponent to={myItem.to} key={"ButtonsNav2" + index}>
            {myItem.children}
          </FooterComponent>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizButtons.map((myItem, index) => (
          <FooterComponent to={myItem.to} key={"ButtonsNav3" + index}>
            {myItem.children}
          </FooterComponent>
        ))}
      {loggedIn &&
        loggedIn.isAdmin &&
        adminButtons.map((myItem, index) => (
          <FooterComponent to={myItem.to} key={"ButtonsNav4" + index}>
            {myItem.children}
          </FooterComponent>
        ))}
    </Box>
  );
};

export default Buttons;
