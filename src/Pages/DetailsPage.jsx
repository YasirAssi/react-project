import React, { useEffect, useState, Fragment } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import PageHeader from "../Layout/header/PageHeader";

const DetailsPage = () => {
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "AIzaSyCKxCRfh3SS1NNLIh91nbMVASCf6gB6ptY";

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=console.debug&libraries=maps,marker&v=beta${apiKey}`
      )
      .then((response) => {
        setMapData(response.data.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching map data:", error);
        setError(error);
      });
  }, []);

  return (
    <Container>
      <Fragment>
        <PageHeader
          title="CardifyHub iNFO"
          subtitle="What is a UI card? Cards are UI components, basically content containers. Usually, cards contain the image, title, description, call to action, and sometimes subheadings or icons. Cards are united by the same concept where each card represents one idea, item, or piece of content."
        />
      </Fragment>
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Our Business
            </Typography>
            <Typography variant="body1">
              We are delighted to serve you. Visit us at the following address:
            </Typography>
            <Typography variant="body1">Street: 123 Main Street</Typography>
            <Typography variant="body1">City: Your City</Typography>
            <Typography variant="body1">Contact us:</Typography>
            <Typography variant="body1">Phone: +1 (123) 456-7890</Typography>
            <Typography variant="body1">Email: info@business.com</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {error ? (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" color="error" gutterBottom>
                Error Fetching Map Data
              </Typography>
              <Typography variant="body1">
                Please check your network connection or try again later.
              </Typography>
            </Paper>
          ) : (
            mapData && (
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Our Location on Google Maps
                </Typography>
                <iframe
                  title="Business Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?q=${mapData.geometry.location.lat},${mapData.geometry.location.lng}&key=${apiKey}`}
                  allowFullScreen
                ></iframe>
              </Paper>
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsPage;
