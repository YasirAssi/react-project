import { Typography, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";

const PageHeader = ({ title, subtitle, paragraph }) => {
  console.log("PageHeader is rendered with title:", title);
  return (
    <Fragment>
      <Grid item md={6}>
        <Typography
          variant="h3"
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
        <Grid item md={6}>
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
        <Grid item md={6}>
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
        <Divider sx={{ backgroundColor: "#fff" }} light />{" "}
      </Grid>
    </Fragment>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  paragraph: PropTypes.string,
};

export default PageHeader;
