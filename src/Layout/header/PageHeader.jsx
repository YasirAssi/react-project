import { Typography, Divider, Grid, Container } from "@mui/material";
import PropTypes from "prop-types";
import { orange, deepPurple } from "@mui/material/colors";

const PageHeader = ({ title, subtitle, paragraph }) => {
  return (
    <Container>
      <Grid container item justifyContent="center" alignItems="center" md={12}>
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
            fontSize: "3rem",
            fontFamily: "cursive",
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
        spacing={1}
        aria-label="uiCollection"
        sx={{
          padding: 4,
          mt: 1,
          backgroundPosition: "center",
          textAlign: "center",
          minHeight: "100px",
          backgroundImage: `url('/assets/imgs/uiCollection.png')`,
        }}
      >
        <Grid item md={6} xs={12}>
          <Typography
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "justify",
              color: orange[500],
              fontSize: "2rem",
              fontFamily: "cursive",
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
              fontSize: "2rem",
              fontFamily: "cursive",
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
