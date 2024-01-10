import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

AuthGuard.prototype = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
