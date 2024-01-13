import { useContext } from "react";
import LogInContext from "../store/loginContext";
import PropTypes from "prop-types";

const BizGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn && logIn.isBusiness) {
    return children;
  }
};

BizGuard.prototype = {
  children: PropTypes.node.isRequired,
};

export default BizGuard;
