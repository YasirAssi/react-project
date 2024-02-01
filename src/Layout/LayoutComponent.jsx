import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import { CssBaseline, Typography } from "@mui/material";
import useAutoLogin from "../hooks/useAutoLogIn";
import PropTypes from "prop-types";
import LogInContext from "../store/loginContext";

const LayoutComponent = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  const [isDarkTheme, SetDarkTheme] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  // const { logIn } = useContext(LogInContext);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     if (logIn && logIn._id) {
  //       try {
  //         const { data } = await axios.get("/users/" + logIn._id);
  //         setUserInfo(data);
  //         console.log("data", data);
  //       } catch (error) {
  //         console.log("err", error);
  //         toast.error("Ops! something went wrong", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       }
  //     }
  //   };

  //   fetchUserInfo();
  // }, [logIn, setUserInfo]);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "*FB0000",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (ClientChecked) => {
    SetDarkTheme(ClientChecked);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <MainComponent>
        {finishAutoLogin ? (
          children
        ) : (
          <Typography variant="h1">Loading...</Typography>
        )}
      </MainComponent>
      <FooterComponent />
    </ThemeProvider>
  );
};

LayoutComponent.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutComponent;
