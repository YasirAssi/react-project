import { Grid, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../Component/CardComponent";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../store/getCardsContext";
import LogInContext from "../store/loginContext";
import useHandleFavClick from "../hooks/useHandleFav";
import useHandleEditCard from "../hooks/useHandleEdit";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const FavPage = () => {
  let { favCards, setFavCards } = useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(4);

  let { id } = useParams();
  const { logIn } = useContext(LogInContext);
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleDeleteCard = (id) => {
    setFavCards((currentDataFromServer) =>
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !logIn) {
          return;
        }
        const response = await axios.get(`/cards/${id}`);
        setFavCards(response.data);
      } catch (error) {
        toast.error("Error fetching data", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };

    fetchData();
  }, [setFavCards, logIn, id]);

  if (!favCards || favCards.length === 0) {
    return <Typography>Could Not Find Items</Typography>;
  }

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleFavCard = (id) => {
    handleFavClick(id);
  };

  return (
    <Grid container spacing={2} mt={7}>
      {favCards.slice(0, visibleItems).map((item, index) => (
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
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        m={3}
      >
        {visibleItems < favCards.length && (
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

export default FavPage;
