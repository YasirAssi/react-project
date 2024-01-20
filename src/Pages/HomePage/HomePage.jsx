import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import CardComponent from "../../Component/CardComponent";
import PageHeader from "../../Layout/header/PageHeader";
import useHandleEditCard from "../../hooks/useHandleEdit";
import useHandleFavClick from "../../hooks/useHandleFav";
import normalizeFav from "../../services/normalizeFavs";
import GetCardsContext from "../../store/getCardsContext";
import useFilterdData from "../../hooks/useFilterdData";
import useHandleDelete from "../../hooks/useHandleDelete";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const HomePage = () => {
  let { cardsFromServer, setCardsFromServer, setCardsCopy } =
    useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(8);
  const FavFilter = useFilterdData();
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const { handleDeleteClick } = useHandleDelete();

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

  if (!cardsFromServer || !cardsFromServer.length) {
    return (
      <Fragment>
        <PageHeader
          title="Card's Page"
          subtitle="Cards, cards, cards - cards are practically everywhere. Pay attention and you will start noticing that most of the apps and platforms these days use UI cards in one or another way."
          paragraph="UI cards are great. Designers love them, developers love them, users
          love them. But is card UI design really a one-size-fits-all solution?
          Here is where you need to decide. With skilled designers, cards really
          can make wonders for almost any web or mobile app"
        />
        <Typography>Could not find any card</Typography>
      </Fragment>
    );
  }

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleDeleteCard = (id) => {
    handleDeleteClick(id);
  };

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
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
        {visibleItems > cardsFromServer.length && (
          <Button
            variant="contained"
            endIcon={<PanToolAltIcon />}
            onClick={scrollToTop}
            color="secondary"
          >
            scroll To Top
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
