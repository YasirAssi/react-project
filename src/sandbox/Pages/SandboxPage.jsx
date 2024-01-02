import { Fragment } from "react";
import { Typography, Divider, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NestedRoute from "./nestedRoute";
import KillComponent from "../KillComponent";

const SandboxPage = () => {
  return (
    <Fragment>
      <Typography variant="h1">Welcome to sandbox</Typography>
      <NestedRoute />
      <KillComponent />
      <Divider />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Fragment>
  );
};
export default SandboxPage;
