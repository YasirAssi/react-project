import { Typography, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";

const PageHeader = ({ title, subtitle, paragraph }) => {
  return (
    <Grid
      sx={{ backgroundColor: "gray", padding: 2 }}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        {subtitle}
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        {paragraph}
      </Typography>
      <Divider light />
    </Grid>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default PageHeader;
