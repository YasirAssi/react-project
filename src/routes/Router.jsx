import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProfilePage from "../Pages/ProfilePage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import ErrorPage from "../Pages/ErrorPage";
import AboutUsPage from "./../Pages/AboutUsPage";
import EditCardPage from "../Pages/EditCardPage/EditCardPage";
import SandboxPage from "../sandbox/Pages/SandboxPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route path={ROUTES.SANDBOX} element={<SandboxPage />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
