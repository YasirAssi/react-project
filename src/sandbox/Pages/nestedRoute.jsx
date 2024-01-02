import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";

const NestedRoute = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="dense">
        <Typography variant="h4" color="initial" sx={{ m: 2 }}>
          <Link to={ROUTES.SANDBOX + "/" + "firstcomponent"}>
            First Component
          </Link>
        </Typography>
        <Typography variant="h4" color="initial" sx={{ m: 2 }}>
          <Link to={ROUTES.SANDBOX + "/" + "LCH"}>Life Circle Hook</Link>
        </Typography>
        <Typography variant="h4" color="initial" sx={{ m: 2 }}>
          <Link to={ROUTES.SANDBOX + "/" + "logIn"}>LogIn Page</Link>
        </Typography>
        <Typography variant="h4" color="initial" sx={{ m: 2 }}>
          <Link to={ROUTES.SANDBOX + "/" + "AppBar"}>AppBar</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NestedRoute;
