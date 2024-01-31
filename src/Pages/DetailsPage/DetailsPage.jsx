import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Paper } from "@mui/material";
import PageHeader from "../../Layout/header/PageHeader";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import CardComponent from "../../Component/CardComponent";
import normalizeDetails from "./normalizeDetails";

import axios from "axios";

const DetailsPage = () => {
  const [cardsFromServer, setCadsFromServer] = useState([]);
  const { id: _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!_id) return;

      try {
        const { data } = await axios.get(`cards/${_id}`);
        setCadsFromServer([normalizeDetails(data)]);
      } catch (err) {
        alert("Failed to find card data");
      }
    };

    fetchData();
  }, [_id]);

  const location = {
    lat: 32.13147290769876,
    lng: 34.96580113830216,
  };

  return (
    <Container>
      <Fragment>
        <PageHeader
          title="CardifyHub iNFO"
          subtitle="What is a UI card? Cards are UI components, basically content containers. Usually, cards contain the image, title, description, call to action, and sometimes subheadings or icons. Cards are united by the same concept where each card represents one idea, item, or piece of content."
        />
      </Fragment>
      <Grid container spacing={2} mt={2}>
        {cardsFromServer.map((card, index) => (
          <Grid
            container
            item
            xs={12}
            md={12}
            key={"carsCard" + index}
            justifyContent="center"
            alignItems="center"
            m={2}
          >
            <CardComponent
              id={card._id}
              title={card.title}
              subtitle={card.subtitle}
              img={card.url}
              phone={card.phone}
              address={card.address}
              cardNumber={card.bizNumber}
            />
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  height: "100%",
                  margin: 2,
                  background: "linear-gradient(45deg, #3498db, #8e44ad)",
                  transition: "background 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    border: "2px solid #3498db",
                    transform: "scale(1.05) rotateZ(0deg)",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  },
                  borderRadius: "15px",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Welcome to {`${cardsFromServer[0]?.title || ""}`}
                </Typography>
                <Typography variant="body1" paragraph>
                  We are excited to have you visit us at the following location:
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong>{" "}
                  {`${cardsFromServer[0].address.street || ""}, ${
                    cardsFromServer[0].address.city || ""
                  }, ${cardsFromServer[0].address.country || ""}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {`${cardsFromServer[0].phone || ""}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {`${cardsFromServer[0].email || ""}`}
                </Typography>
                <Typography variant="body1" mt={2}>
                  Our friendly team is here to assist you. Feel free to reach
                  out for any inquiries or assistance you may need.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} md={12} mb={3}>
          <Paper elevation={3} sx={{ padding: 2, height: "400px" }}>
            <Typography variant="h6" gutterBottom>
              Our Location on Google Maps
            </Typography>
            <LoadScript googleMapsApiKey="AIzaSyCKxCRfh3SS1NNLIh91nbMVASCf6gB6ptY">
              <GoogleMap
                center={location}
                zoom={15}
                mapContainerStyle={{ height: "100%", width: "100%" }}
              >
                <Marker position={location} label="CardifyHub" />
              </GoogleMap>
            </LoadScript>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsPage;
