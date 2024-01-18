import { Typography, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";

const PageHeader = ({ title, subtitle, paragraph }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        padding: 4,
        mt: 2,
        backgroundPosition: "center",
        textAlign: "center",
        minHeight: "300px",
        backgroundImage: `url('/assets/imgs/uiCardDesign.png')`,
      }}
    >
      <Grid item md={4}>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {subtitle}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
        >
          {paragraph}
        </Typography>
      </Grid>
      <Divider sx={{ backgroundColor: "#666" }} light />{" "}
    </Grid>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default PageHeader;
