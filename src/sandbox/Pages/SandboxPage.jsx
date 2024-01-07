import { Fragment } from "react";
import { Typography, Divider, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const SandboxPage = () => {
  return (
    <Fragment>
      <Typography variant="h1">Welcome to sandbox</Typography>

      <Divider />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Fragment>
  );
};
export default SandboxPage;
