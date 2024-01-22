import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, Button, IconButton, Tooltip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardComponent from "../Component/CardComponent";
import axios from "axios";
import GetCardsContext from "../store/getCardsContext";
import ROUTES from "../routes/ROUTES";
import useHandleFavClick from "../hooks/useHandleFav";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import normalizeFav from "../services/normalizeFavs";
import useFilterdData from "../hooks/useFilterdData";
import PageHeader from "../Layout/header/PageHeader";
import useHandleDelete from "../hooks/useHandleDelete";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

const MyCardsPage = () => {
  let { cardsFromServer, setCardsFromServer, setCardsCopy } =
    useContext(GetCardsContext);
  const [visibleItems, setVisibleItems] = useState(4);
  const navigate = useNavigate();
  const { handleFavClick } = useHandleFavClick();
  const FavFilter = useFilterdData();
  const { handleDeleteClick } = useHandleDelete();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/cards/my-cards").then(({ data }) => {
          setCardsFromServer(normalizeFav(data));
          setCardsCopy(normalizeFav(data));
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setCardsFromServer, setCardsCopy]);

  if (!cardsFromServer || !cardsFromServer.length) {
    return (
      <Fragment>
        <PageHeader
          title="Creat Your Own Card"
          subtitle="Cards, cards, cards - cards are practically everywhere."
          paragraph=" Cards can really
          make wonders for almost any web or mobile app"
        />
        <Tooltip title="Creat New Card">
          <Link to={ROUTES.CREATECARD}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <IconButton>
                <AddCircleOutlineIcon />
                <Typography color="primary">Creat Your Own Card</Typography>
              </IconButton>
            </Grid>
          </Link>
        </Tooltip>
        <Typography>Could not find any card</Typography>
      </Fragment>
    );
  }

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleDeleteCard = (id) => {
    handleDeleteClick(id);
  };

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };

  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <Fragment>
      <PageHeader
        title="CardifyHub Cards"
        subtitle="Cards, cards, cards - cards are practically everywhere."
        paragraph=" Cards can really
          make wonders for almost any web or mobile app"
      />
      <Tooltip title="Creat New Card">
        <Link to={ROUTES.CREATECARD}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            m={3}
          >
            <IconButton>
              <AddCircleOutlineIcon color="primary" />
              <Typography color="primary" sx={{ ml: 1 }}>
                Creat Your Own Card
              </Typography>
            </IconButton>
          </Grid>
        </Link>
      </Tooltip>

      <Grid container spacing={2} mt={7}>
        {FavFilter.slice(0, visibleItems).map((card, index) => (
          <Grid item lg={3} md={3} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={card._id}
              title={card.title}
              subtitle={card.subtitle}
              img={card.image.url}
              phone={card.phone}
              address={card.address}
              cardNumber={card.bizNumber}
              onDelete={handleDeleteCard}
              Info={handleInfoClick}
              onEdit={handleEditCard}
              onFav={handleFavCard}
              isFav={card.liked}
            />
          </Grid>
        ))}
        <Tooltip title="Creat New Card">
          <Link to={ROUTES.CREATECARD}>
            <IconButton>
              <PlusOneIcon color="primary" />
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
    </Fragment>
  );
};

export default MyCardsPage;
