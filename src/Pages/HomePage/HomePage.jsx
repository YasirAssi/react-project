import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardComponent from "../../Component/CardComponent";
import PageHeader from "../../Layout/header/PageHeader";
import useHandleEditCard from "../../hooks/useHandleEdit";
import useHandleFavClick from "../../hooks/useHandleFav";
import ROUTES from "../../routes/ROUTES";
import normalizeFav from "../../services/normalizeFavs";
import GetCardsContext from "../../store/getCardsContext";
import LogInContext from "../../store/loginContext";
import useFilterdData from "../../hooks/useFilterdData";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const HomePage = () => {
  let { logIn } = useContext(LogInContext);
  let { cardsFromServer, setCardsFromServer, setCardsCopy } =
    useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(8);
  const FavFilter = useFilterdData();
  const { handleFavClick } = useHandleFavClick();
  const navigate = useNavigate();
  const { handleEditClick } = useHandleEditCard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/cards").then(({ data }) => {
          console.log(normalizeFav(data));

          setCardsFromServer(normalizeFav(data));
          setCardsCopy(normalizeFav(data));
        });
      } catch (error) {
        return <Typography>Error,Could not find any card</Typography>;
      }
    };

    fetchData();
  }, [setCardsFromServer, setCardsCopy]);

  // const dataFromServerFiltered = useMemo(() => {
  //   return normalizeFav(cardsFromServer, logIn ? logIn._id : undefined);
  // }, [cardsFromServer, logIn]);

  if (!cardsFromServer || !cardsFromServer.length) {
    return <Typography>Could not find any card</Typography>;
  }

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleDeleteCard = (id) => {
    // const card = cardsFromServer.find((item) => item._id === id);
    if (logIn && (logIn.isAdmin || logIn.isBusiness)) {
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
      if (!logIn) navigate(ROUTES.LOGIN);
    }
  };

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Fragment>
        <PageHeader
          title="Card's Page"
          subtitle="Cards, cards, cards - cards are practically everywhere. Pay attention and you will start noticing that most of the apps and platforms these days use UI cards in one or another way."
          paragraph="UI cards are great. Designers love them, developers love them, users
          love them. But is card UI design really a one-size-fits-all solution?
          Here is where you need to decide. With skilled designers, cards really
          can make wonders for almost any web or mobile app"
        />
      </Fragment>
      {FavFilter.slice(0, visibleItems).map((item, index) => (
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
