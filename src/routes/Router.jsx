import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../Pages/HomePage/HomePage";
// import LoginPage from "../Pages/LoginPage/LoginPage";
// import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ErrorPage from "../Pages/ErrorPage";
// import AboutUsPage from "./../Pages/AboutUsPage";
// import CardsExample from "../sandbox/Pages/CardsExample";
// import EditCardPage from "../Pages/EditCardPage";
// import SandboxPage from "../sandbox/Pages/SandboxPage";
import ContextPage from "../sandbox/Pages/ContextPage";

const Router = () => {
  //http://localhost:3000/

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={`${ROUTES.EDITCARD}/:id`} element={<EditCardPage />} /> */}
      {/* <Route path="/edit/:id" element={<EditCardPage />} /> */}
      {/* <Route path="/cards-example" element={<CardsExample />} />
      <Route path="/sandbox" element={<SandboxPage />}></Route> */}
      <Route path="/context" element={<ContextPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
export default Router;
/**
 * /sandbox/a1
 * /sandbox/a2
 * /sandbox/a3
 */
