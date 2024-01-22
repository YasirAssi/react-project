import React, { Fragment } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import PageHeader from "../Layout/header/PageHeader";

const DetailsPage = () => {
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
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to CardifyHub
            </Typography>
            <Typography variant="body1" paragraph>
              We are excited to have you visit us at the following location:
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> Yaffo Street, Kafr Bara, Building 11
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> +972 548-195-183
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> CardifyHub@gmail.com
            </Typography>
            <Typography variant="body1" mt={2}>
              Our friendly team is here to assist you. Feel free to reach out
              for any inquiries or assistance you may need.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Our Location on Google Maps
            </Typography>
            <iframe
              title="CardifyHub Location"
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d5682.185132361709!2d34.962328527035375!3d32.132820959372026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x151d30a717585cdb%3A0xf1309e20c3fb3da2!2z15nXpNeVLCBLYWZyIEJhcmE!3m2!1d32.13129!2d34.965828099999996!5e0!3m2!1sen!2sil!4v1705929133403!5m2!1sen!2sil"
              width="100%"
              height="80%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsPage;
