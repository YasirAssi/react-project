import * as React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Switch,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import FilterComponent from "./ui/FilterComponent";

import ROUTES from "../../routes/ROUTES";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import { toast } from "react-toastify";
import LogInContext from "../../store/loginContext";
import PropTypes from "prop-types";

const themes = tmc({
  "text.headerColor": "!gray",
  "text.headerActive": "*white",
  favActive: "*FB0000",
});

const darkMode = createTheme(themes.dark);

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logIn, setLogIn } = useContext(LogInContext);
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleLogOut = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setLogIn(false);
      toast(" You're Logged Out", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.HOME);
    } else {
      setLogIn(false);
      toast("Connect Now", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            CardifyHub
          </Typography>
          <Links />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ display: { xs: "flex" } }}>
            <Tooltip title="Account">
              <Link to={ROUTES.MYCARDS}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar>
                    <img
                      alt="Yasir Assi"
                      src="/assets/imgs/myPhoto.jpg"
                      width="100%"
                    />
                  </Avatar>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
          <ThemeProvider theme={darkMode}>
            <IconButton size="large" color="" onClick={handleLogOut}>
              {logIn ? <LogoutIcon /> : <LoginIcon />}
            </IconButton>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />
    </Box>
  );
};

HeaderComponent.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};
export default HeaderComponent;
