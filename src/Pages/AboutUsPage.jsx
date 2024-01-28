import { Fragment } from "react";
import PageHeader from "../Layout/header/PageHeader";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Fragment>
      <PageHeader
        title="About Us - CardifyHub"
        subtitle="lets start the journey..."
      />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h6">Our Service</Typography>
              <Typography paragraph>
                This website is a project that was created for the purpose of
                providing a management system that allows business users to
                publish content using UI Cards. The published content will be
                available in different parts of the site.
              </Typography>
              <Typography variant="h6">Our HomePage</Typography>
              <Typography paragraph>
                This is the first station that users will be redirected when
                they access the site. In this page, users can see the other
                users business cards, also they can the business info onClick on
                the info icon thet directs them to the business Details Page.
              </Typography>
              <Typography variant="h6">First to Sign Up</Typography>
              <Typography paragraph>
                In order to have access to the site, users must first sign up in
                the rehister Page. Here, user need to insert his information
                (name, title, Email etc.) There are three different types of
                users: Admin,Business and User.
              </Typography>
              <Typography variant="h6">Second move to Log In</Typography>
              <Typography paragraph>
                As we Sayed Earlier there are three different types of users:
                Admin,Business and User. Each user type has different privileges
                and can access, while the Buisness user can create, edit and
                delete their own cards. User can only see the published cards
                also to like them. On the other hand, Admin can access all the
                features of the site.
              </Typography>
              <Typography variant="h6">Create Your Own Cards</Typography>
              <Typography paragraph>
                Only Admin and Business users can create their own cards. In
                this Page users can create their own cards by filling the form
                with the necessary and valid information.
              </Typography>
              <Typography variant="h6">Update Your Cards</Typography>
              <Typography paragraph>
                Only Admin and Business users can update their own cards by
                entering the wanted information in the form.
              </Typography>
              <Typography variant="h6">Sure You have Your Favorites</Typography>
              <Typography paragraph>
                By clickin on the star icon, the user can add the card to his
                Favoraite Page. This page will be available only if the user is
                signed in. Every favorite card will be specilized by turning the
                star icon into yellow.
              </Typography>
              <Typography variant="h6">Know more about the business</Typography>
              <Typography paragraph>
                As mentioned before, users can see the business details by
                clicking the info icon. This page will show the business card,
                the business name, the business location, the business phone
                number and the business email.
              </Typography>
              <Typography variant="h6">
                Finally, update us with your new in your profile changes
              </Typography>
              <Typography paragraph>
                profile page will be available only if the user is signed in.
                Here, usercan update his information (name, title, Email etc.).
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
                    style={{ width: "100%", borderRadius: 8, height: 286 }}
                  />
                  <Typography variant="caption">SaaS Businesses</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/_Image credit Netflix.png"
                    alt="Media Example"
                    style={{ width: "100%", borderRadius: 8, height: 286 }}
                  />
                  <Typography variant="caption">
                    Media, Entertainment
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/Dashboard apps and platforms.png"
                    alt="Dashboard Example"
                    style={{ width: "100%", borderRadius: 8, height: 285 }}
                  />
                  <Typography variant="caption">Dashboard Apps</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="/assets/imgs/realEstate.png"
                    alt="Real Estate Example"
                    style={{ width: "100%", borderRadius: 8, height: 285 }}
                  />
                  <Typography variant="caption">
                    Real Estate Platforms
                  </Typography>
                </Grid>
                <Typography variant="h6">
                  Advantages of Card UI Design
                </Typography>
                <Typography paragraph>
                  Thanks to the bright image element, small bits of information,
                  easy-to-click CTAs and similar, UI cards grab users’
                  attention. They have better scrolling rates and bring more
                  impact than lists.
                </Typography>
                <Typography paragraph>
                  Highly responsive: Probably the main advantage of UI cards is
                  that they are very adaptive. It’s the rectangular shape that
                  makes them transformative. That is why UI cards look good on
                  all screen sizes.
                </Typography>
                <Typography paragraph>
                  Easy-to-understand: UI cards are rather minimalistic and
                  understandable design elements. Small chunks of information
                  they reveal are easy to consume.
                </Typography>
                <Typography paragraph>
                  Intuitive and UX friendly: Most users are familiar with the
                  card interface design and can easily navigate through it.
                  Rectangular shape and simple clickable elements make the user
                  experience very intuitive.
                </Typography>
                <Typography paragraph>
                  Clickable: UI card is a perfect instrument to make clients
                  interact with your product. Compact and well-designed cards
                  with the right CTA make users want to click and share
                  instantly.
                </Typography>
                <Typography>
                  to read more about UI Cards:{" "}
                  <a
                    href="https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Elken Blog
                  </a>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default AboutUsPage;
