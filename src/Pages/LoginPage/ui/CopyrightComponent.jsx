import { Link, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CopyrightComponent = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Yasser Assi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

CopyrightComponent.propTypes = {
  props: PropTypes.any,
};

export default CopyrightComponent;
