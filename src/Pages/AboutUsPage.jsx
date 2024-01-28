import { Fragment } from "react";
import PageHeader from "../Layout/header/PageHeader";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";

const AboutUsPage = () => {
  const projectDetails = [
    {
      title: "Our Service",
      icon: <FolderIcon />,
      content:
        "This website is a project that was created for the purpose of providing a management system that allows business users to publish content using UI Cards. The published content will be available in different parts of the site.",
    },
    {
      title: "Our HomePage",
      icon: <HomeIcon />,
      content:
        "This is the first station that users will be redirected when they access the site. In this page, users can see the other users business cards, also they can the business info onClick on the info icon thet directs them to the business Details Page.",
    },
    {
      title: "First to Sign Up",
      icon: <PersonAddIcon />,
      content:
        "In order to have access to the site, users must first sign up in the rehister Page. Here, user need to insert his information (name, title, Email etc.) There are three different types of users: Admin,Business and User.",
    },
    {
      title: "Second move to Log In",
      icon: <LockOpenIcon />,
      content:
        "As we Sayed Earlier there are three different types of users: Admin,Business and User. Each user type has different privileges and can access, while the Buisness user can create, edit and delete their own cards. User can only see the published cards also to like them. On the other hand, Admin can access all the features of the site.",
    },
    {
      title: "Create Your Own Cards",
      icon: <CreateIcon />,
      content:
        "Only Admin and Business users can create their own cards. In this Page users can create their own cards by filling the form with the necessary and valid information.",
    },
    {
      title: "Update Your Cards",
      icon: <EditIcon />,
      content:
        "Only Admin and Business users can update their own cards by entering the wanted information in the form.",
    },
    {
      title: "Sure You have Your Favorites",
      icon: <StarIcon />,
      content:
        "By clickin on the star icon, the user can add the card to his Favoraite Page. This page will be available only if the user is signed in. Every favorite card will be specilized by turning the star icon into yellow.",
    },
    {
      title: "Know more about the business",
      icon: <InfoIcon />,
      content:
        "As mentioned before, users can see the business details by clicking the info icon. This page will show the business card, the business name, the business location, the business phone number and the business email.",
    },
    {
      title: "Finally, update us with your new in your profile changes",
      icon: <PersonIcon />,
      content:
        "Profile page will be available only if the user is signed in. Here, usercan update his information (name, title, Email etc.).",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <PageHeader
        title="About Us - CardifyHub"
        subtitle="Glad to have you in CardifyHub"
      />

      <Container sx={{ mt: 4 }}>
        <Slider {...sliderSettings}>
          {projectDetails.map((step, index) => (
            <Box key={index}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} style={{ padding: 20 }}>
                    <Typography variant="h6">
                      {step.icon} {step.title}
                    </Typography>
                    <Typography paragraph>{step.content}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Slider>
      </Container>
    </Fragment>
  );
};

export default AboutUsPage;
