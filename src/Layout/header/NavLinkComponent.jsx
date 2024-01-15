import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{ p: 2 }}
          variant="h8"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

NavLinkComponent.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLinkComponent;
