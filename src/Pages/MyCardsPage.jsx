import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, Button, IconButton, Tooltip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../Component/CardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../store/getCardsContext";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import useHandleFavClick from "../hooks/useHandleFav";
import PlusOneIcon from "@mui/icons-material/PlusOne";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const MyCardsPage = () => {
  let { cardsFromServer, setCardsFromServer, favCards } =
    useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(4);
  const { logIn } = useContext(LogInContext);
  const navigate = useNavigate();
  const { handleFavClick } = useHandleFavClick();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cards/my-cards");
        setCardsFromServer(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setCardsFromServer]);

  if (!cardsFromServer || !cardsFromServer.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleDeleteCard = (id) => {
    if (cardsFromServer || logIn.isAdmin) {
      setCardsFromServer((currentDataFromServer) =>
        currentDataFromServer.filter((card) => card._id !== id)
      );
      toast("🦄 Card Is Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warn("Only Aadmin or Card Owner can Edit!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.HOME);
    }
  };

  const handleFavCard = (id) => {
    handleFavClick(id);
  };

  return (
    <Grid container spacing={2} mt={7}>
      {cardsFromServer.slice(0, visibleItems).map((item, index) => (
        <Grid item lg={3} md={3} xs={12} key={"carsCard" + index}>
          <CardComponent
            id={item._id}
            title={item.title}
            subtitle={item.subtitle}
            img={item.image.url}
            phone={item.phone}
            address={item.address}
            cardNumber={item.bizNumber}
            onDelete={handleDeleteCard}
            onCall={handlePhoneCard}
            onEdit={handleEditCard}
            onFav={handleFavCard}
            isFav={favCards.some((card) => card._id === item._id)}
          />
        </Grid>
      ))}
      <Tooltip title="Creat New Card">
        <Link to={ROUTES.CREATECARD}>
          <IconButton>
            <PlusOneIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        m={3}
      >
        {visibleItems < cardsFromServer.length && (
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleShowMore}
            color="secondary"
          >
            Show More Cards
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default MyCardsPage;
