import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LogInContext from "../store/loginContext";
import PropTypes from "prop-types";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn && logIn.isBusiness) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};

BizGuard.prototype = {
  children: PropTypes.node.isRequired,
};

export default BizGuard;
