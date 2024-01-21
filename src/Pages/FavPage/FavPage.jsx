import { Grid, Typography, Button } from "@mui/material";
import CardComponent from "../../Component/CardComponent";
import { Fragment, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GetCardsContext from "../../store/getCardsContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";
import normalizeFav from "../../services/normalizeFavs";
import useFilterdData from "../../hooks/useFilterdData";
import useHandleDelete from "../../hooks/useHandleDelete";
import LogInContext from "../../store/loginContext";
import PageHeader from "../../Layout/header/PageHeader";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const FavPage = () => {
  let { setCardsCopy, setCardsFromServer } = useContext(GetCardsContext);
  const { logIn } = useContext(LogInContext);

  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const FavFilter = useFilterdData();
  const { handleDeleteClick } = useHandleDelete();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        await axios.get("/cards").then(({ data }) => {
          console.log(normalizeFav(data));
          setCardsFromServer(normalizeFav(data));
          setCardsCopy(normalizeFav(data));
        });
      } catch (error) {
        toast.error("Error fetching likes", {
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

    fetchLikes();
  }, [setCardsCopy, setCardsFromServer]);

  if (!FavFilter || !FavFilter.length) {
    return (
      <Fragment>
        <PageHeader
          title="Favorite Cards Page"
          subtitle="Cards, cards, cards "
          paragraph="UI cards are great."
        />
        <Typography>Could not find any card</Typography>
      </Fragment>
    );
  }

  const handleEditCard = (id) => {
    handleEditClick(id);
  };

  const handleFavCard = async (id) => {
    handleFavClick(id);
  };
  const handleDeleteCard = (id) => {
    handleDeleteClick(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <Fragment>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="Cards, cards, cards "
        paragraph="UI cards are great."
      />
      <Grid container spacing={2} mt={5}>
        {FavFilter.map(
          (item, index) =>
            FavFilter[index].likes.some((id) => id === logIn._id) && (
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
          <Button
            variant="contained"
            endIcon={<PanToolAltIcon />}
            onClick={scrollToTop}
            color="secondary"
          >
            scroll To Top
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FavPage;
