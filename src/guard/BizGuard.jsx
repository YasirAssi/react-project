import { useContext } from "react";
import LogInContext from "../store/loginContext";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const BizGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn && logIn.isBusiness) {
    return children;
  } else {
    toast("You need to SignIn", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

BizGuard.prototype = {
  children: PropTypes.node.isRequired,
};

export default BizGuard;
