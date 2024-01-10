import { Container } from "@mui/material";
import PropTypes from "prop-types";

const MainComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

MainComponent.prototype = {
  children: PropTypes.node.isRequired,
};
export default MainComponent;
