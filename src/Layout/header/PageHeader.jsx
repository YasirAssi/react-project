import { Typography, Divider, Grid, Container } from "@mui/material";
import PropTypes from "prop-types";
import { orange, deepPurple } from "@mui/material/colors";

const PageHeader = ({ title, subtitle, paragraph }) => {
  console.log("PageHeader is rendered with title:", title);
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" md={12}>
        <Typography
          sx={{
            display: "flex",
            fontWeight: "bold",
            backgroundSize: "cover",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: deepPurple[200],
            height: "2rem",
            padding: 5,
            fontSize: "2rem",
          }}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        aria-label="uiCollection"
        sx={{
          padding: 4,
          mt: 1,
          backgroundPosition: "center",
          textAlign: "center",
          minHeight: "300px",
          backgroundImage: `url('/assets/imgs/uiCollection.png')`,
        }}
      >
        <Grid item md={6}>
          <Typography
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "justify",
              color: orange[500],
              fontSize: "1.5rem",
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: orange[100],
              fontSize: "1.5rem",
            }}
          >
            {paragraph}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: "#fff" }} light />
    </Container>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  paragraph: PropTypes.string,
};

export default PageHeader;
