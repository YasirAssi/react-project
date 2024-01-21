import { Fragment } from "react";
import PageHeader from "../Layout/header/PageHeader";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Fragment>
      <PageHeader
        title="About Us - CardifyHub"
        subtitle="What is a UI card? Cards are UI components, basically content containers. Usually, cards contain the image, title, description, call to action, and sometimes subheadings or icons. Cards are united by the same concept where each card represents one idea, item, or piece of content."
      />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h6">Advantages of Card UI Design</Typography>
              <Typography paragraph>
                Thanks to the bright image element, small bits of information,
                easy-to-click CTAs and similar, UI cards grab users’ attention.
                They have better scrolling rates and bring more impact than
                lists.
              </Typography>
              <Typography paragraph>
                Highly responsive: Probably the main advantage of UI cards is
                that they are very adaptive. It’s the rectangular shape that
                makes them transformative. That is why UI cards look good on all
                screen sizes.
              </Typography>
              <Typography paragraph>
                Easy-to-understand: UI cards are rather minimalistic and
                understandable design elements. Small chunks of information they
                reveal are easy to consume.
              </Typography>
              <Typography paragraph>
                Intuitive and UX friendly: Most users are familiar with the card
                interface design and can easily navigate through it. Rectangular
                shape and simple clickable elements make the user experience
                very intuitive.
              </Typography>
              <Typography paragraph>
                Clickable: UI card is a perfect instrument to make clients
                interact with your product. Compact and well-designed cards with
                the right CTA make users want to click and share instantly.
              </Typography>
              <Typography paragraph>
                Attractive and modern-looking: Despite the fact that card-based
                design has been around for a decade now, it is still an
                up-to-date design solution. Their key visual element makes it
                easy to make any product attractive using this layout.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography paragraph>
                Best examples of card UI design: If you are considering using
                cards for your app or platform, you could use some UI card
                design inspiration. Here are some examples:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/SassBiz.png"
                    alt="SaaS Example"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="caption">SaaS Businesses</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/_Image credit Netflix.png"
                    alt="Media Example"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="caption">
                    Media, Entertainment
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/Dashboard apps and platforms.png"
                    alt="Dashboard Example"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="caption">Dashboard Apps</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/realEstate.png"
                    alt="Real Estate Example"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="caption">
                    Real Estate Platforms
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default AboutUsPage;
