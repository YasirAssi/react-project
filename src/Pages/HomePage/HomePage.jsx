import { Grid, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../../Component/CardComponent";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../../store/getCardsContext";
import ROUTES from "../../routes/ROUTES";
import LogInContext from "../../store/loginContext";
import { jwtDecode } from "jwt-decode";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const HomePage = () => {
  let { logIn } = useContext(LogInContext);
  let { cardsFromServer, setCardsFromServer, setCardsCopy, favCards } =
    useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(8);
  const [userData, setUserData] = useState(null);
  const { handleFavClick } = useHandleFavClick();
  const navigate = useNavigate();
  const { handleEditClick } = useHandleEditCard();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCardsCopy(data);
        setCardsFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
    let token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      setUserData(userData);
    }
  }, [setCardsFromServer, setCardsCopy]);
  if (!cardsFromServer || !cardsFromServer.length) {
  }

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleDeleteCard = (id) => {
    const card = cardsFromServer.find((item) => item._id === id);
    if (
      logIn &&
      (logIn.isAdmin || (logIn.isBusiness && card.user_id === userData._id))
    ) {
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
      toast.warn("Only Aadmin or LoggedIn Owner can Delete!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
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
            isLiked={favCards.some((card) => card._id === item._id)}
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

export default HomePage;
