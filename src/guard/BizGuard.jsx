import { useContext } from "react";
import LogInContext from "../store/loginContext";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  const { logIn } = useContext(LogInContext);
  if (logIn && logIn.isBusiness) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default BizGuard;
