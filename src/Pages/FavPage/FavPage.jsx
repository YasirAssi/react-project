import { Grid, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../../Component/CardComponent";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../../store/getCardsContext";
import LogInContext from "../../store/loginContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";
import { jwtDecode } from "jwt-decode";
import normalizeFav from "../../services/normalizeFavs";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const FavPage = (id) => {
  let { setCardsCopy, cardsFromServer, setCardsFromServer } =
    useContext(GetCardsContext);
  const [liked, setLiked] = useState("");
  const [visibleItems, setVisibleItems] = useState(4);
  const { logIn } = useContext(LogInContext);
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  let token = localStorage.getItem("token");
  let userData = jwtDecode(token);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Current userData id:", userData._id);

        if (!userData._id || !logIn) {
          return;
        }

        await axios.get(`/cards/${userData._id}`).then(({ data }) => {
          const normalizedData = normalizeFav(data, liked);
          console.log(normalizeFav(data));
          setCardsFromServer(normalizeFav(data));
          setCardsCopy(normalizeFav(data));
        });
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
  }, [logIn, userData._id, setCardsCopy, setCardsFromServer]);

  let dataFromServerFiltered = normalizeFav(
    cardsFromServer,
    logIn ? logIn._id : undefined
  );

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
            isFav={item.liked}
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
        {visibleItems < dataFromServerFiltered.length && (
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
