import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetCardsContext from "../store/getCardsContext";
import { toast } from "react-toastify";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const useHandleFavClick = () => {
  let { favCards, setFavCards, setCardsFromServer, cardsFromServer } =
    useContext(GetCardsContext);
  let { logIn } = useContext(LogInContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Add any additional logic you want to run on mount or when favCards/cardsFromServer change
  // }, [favCards, cardsFromServer]);

  const handleFavClick = async (id) => {
    if (!logIn) {
      toast("Please log in to add this card to your favorites", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
      return;
    }
    const isCardLiked = favCards.some((card) => card._id === id);
    try {
      setFavCards((currentFavCards) => {
        if (isCardLiked) {
          return currentFavCards.filter((card) => card._id !== id);
        } else {
          return [
            ...currentFavCards,
            ...cardsFromServer.filter((card) => card._id === id),
          ];
        }
      });
      await axios.patch(`/cards/${id}`);
      toast(
        `Card has been ${
          isCardLiked ? "removed from" : "added to"
        } your favorites. ${isCardLiked ? "😢" : "🌟"}`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      const updatedCards = cardsFromServer.map((card) =>
        card._id === id ? { ...card, isLiked: !isCardLiked } : card
      );
      setCardsFromServer(updatedCards);
    } catch (error) {
      setFavCards((currentFavCards) => {
        if (isCardLiked) {
          return [
            ...currentFavCards,
            ...cardsFromServer.filter((card) => card._id === id),
          ];
        } else {
          return currentFavCards.filter((card) => card._id !== id);
        }
      });
      toast.error(
        `Error ${isCardLiked ? "un" : ""}liking the card. Please try again.`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  return { favCards, cardsFromServer, handleFavClick };
};

export default useHandleFavClick;
