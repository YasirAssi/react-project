import { Fragment } from "react";
import { Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";

const PageHeader = ({ title, subtitle }) => {
  return (
    <Fragment>
      <Typography variant="h1">{title}</Typography>
      <Typography>{subtitle}</Typography>
      <Divider></Divider>
    </Fragment>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageHeader;
