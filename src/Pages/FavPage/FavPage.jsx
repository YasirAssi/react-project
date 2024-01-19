import { Grid, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../../Component/CardComponent";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../../store/getCardsContext";
import LogInContext from "../../store/loginContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";
// import { jwtDecode } from "jwt-decode";
import normalizeFav from "../../services/normalizeFavs";
import useFilterdData from "../../hooks/useFilterdData";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const FavPage = () => {
  let { setCardsCopy, cardsFromServer, setCardsFromServer } =
    useContext(GetCardsContext);

  const [visibleItems, setVisibleItems] = useState(4);
  const { logIn } = useContext(LogInContext);
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const { id } = useParams();
  const FavFilter = useFilterdData();
  const [likesArray, setLikesArray] = useState([]);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleDeleteCard = (id) => {
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
  };

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     try {
  //       if (
  //         cardsFromServer
  //           .slice(0, visibleItems)
  //           .map((card, index) =>
  //             cardsFromServer[index].likes.some((id) => id === logIn._id)
  //           )
  //       ) {
  //         const { data } = await axios.get(`/cards/${id}`);
  //         let likesArray = data.likes;
  //         console.log("Likes:", likesArray); // this does not show in the console
  //         setLikesArray(likesArray);
  //       }
  //     } catch (error) {
  //       toast.error("Error fetching likes", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }
  //   };

  //   fetchLikes();
  // }, [id]);

  if (!cardsFromServer || !cardsFromServer.length) {
    return <Typography>Could Not Find Items</Typography>;
  }

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };

  return (
    <Grid container spacing={2} mt={7}>
      {cardsFromServer.slice(0, visibleItems).map(
        (item, index) =>
          cardsFromServer[index].likes.some((id) => id === logIn._id) && (
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
                isFav={item.liked}
              />
            </Grid>
          )
      )}
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

export default FavPage;
