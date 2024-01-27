import ROUTES from "../../routes/ROUTES";
import InfoIcon from "@mui/icons-material/Info";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import StarIcon from "@mui/icons-material/Star";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const alwaysButtons = [
  {
    to: ROUTES.ABOUT,
    title: "About Us",
    icon: <InfoIcon />,
  },
];

const loggedInButtons = [
  { to: ROUTES.FAV, title: "FavCards 🌟", icon: <StarIcon /> },
];

const bizButtons = [
  { to: ROUTES.MYCARDS, title: "MYCARDS", icon: <LoyaltyIcon /> },
];

const adminButtons = [
  { to: ROUTES.SANDBOX, title: "UserManage", icon: <AdminPanelSettingsIcon /> },
];

const loggedOutButtons = [
  {
    to: ROUTES.REGISTER,
    title: "Register page",
    icon: <AppRegistrationIcon />,
  },
  { to: ROUTES.LOGIN, title: "Login page", icon: <LoginIcon /> },
];

export {
  alwaysButtons,
  loggedInButtons,
  loggedOutButtons,
  bizButtons,
  adminButtons,
};
