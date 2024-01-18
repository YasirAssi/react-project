import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import ErrorPage from "../Pages/ErrorPage";
import AboutUsPage from "./../Pages/AboutUsPage";
import EditCardPage from "../Pages/EditCardPage";
import CreateCardPage from "../Pages/CreateCardPage";
import SandboxPage from "../sandbox/Pages/SandboxPage";
import MyCardsPage from "../Pages/MyCardsPage";
import FavPage from "../Pages/FavPage/FavPage";

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
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.FAV}
        element={
          <AuthGuard>
            <FavPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <BizGuard>
            <MyCardsPage />
          </BizGuard>
        }
      />
      <Route path={ROUTES.SANDBOX} element={<SandboxPage />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;

//router code page
