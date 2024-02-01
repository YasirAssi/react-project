import { useContext, useState } from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import Links from "./ui/Links";
import FilterComponent from "./ui/FilterComponent";

import ROUTES from "../../routes/ROUTES";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import { toast } from "react-toastify";
import LogInContext from "../../store/loginContext";
import { getToken } from "../../services/storageService";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const themes = tmc({
  "text.headerColor": "!gray",
  "text.headerActive": "*white",
  favActive: "*FB0000",
});

const darkMode = createTheme(themes.dark);

const HeaderComponent = ({ isDarkTheme, onThemeChange, userInfo }) => {
  const { logIn, setLogIn } = useContext(LogInContext);
  const navigate = useNavigate();
  const [appBarColor, setAppBarColor] = useState("#673ab7");

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleColorChange = (newColor) => {
    setAppBarColor(newColor);
    document.body.style.background = newColor;
  };

  const colorChoices = [
    { label: "Purple", value: "#673ab7" },
    { label: "Green", value: "#4caf50" },
    { label: "Blue", value: "#2196f3" },
    { label: "Red", value: "#f44336" },
  ];

  const handleLogOut = async () => {
    let token = getToken();
    if (token) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
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
      <AppBar
        position="static"
        className="AppBar"
        style={{ backgroundColor: appBarColor }}
      >
        <Toolbar>
          <Typography
            sx={{
              display: { sm: "block" },
              flexGrow: 1,
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
              },
            }}
          >
            CardifyHub
          </Typography>
          <Tooltip title="HomePage">
            <Link to={ROUTES.HOME}>
              <IconButton>
                <HomeIcon />
              </IconButton>
            </Link>
          </Tooltip>
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
          <Select
            value={appBarColor}
            onChange={(e) => handleColorChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Change Color" }}
            sx={{
              width: "100px",
              height: "30px",
              borderRadius: "5px",
            }}
          >
            {colorChoices.map((choice) => (
              <MenuItem key={choice.value} value={choice.value}>
                {choice.label}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: { xs: "flex" } }}>
            <Tooltip title="Profile">
              <Link
                to={ROUTES.PROFILE}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {userInfo && !Array.isArray(userInfo) ? (
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "1rem",
                      marginBottom: "8px",
                      fontFamily: "cursive",
                      fontWeight: "bold",
                      color: "#fff",
                      textTransform: "capitalize",
                      marginLeft: "10px",
                    }}
                  >
                    {/* {userInfo.name.first} {userInfo.name.last} */}
                  </Typography>
                ) : null}
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
    </Box>
  );
};

HeaderComponent.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }),
  }),
};

export default HeaderComponent;
