import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import PropTypes from "prop-types";

const AdminGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn && logIn.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

AdminGuard.prototype = {
  children: PropTypes.node.isRequired,
};

export default AdminGuard;
