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

  const handleFavClick = (id) => {
    if (!logIn) {
      toast("Please logIn to add this card to your favorites", {
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
    console.log(`Handling favorite click for card with ID: ${id}`);

    if (isCardLiked) {
      axios
        .patch(`/cards/${id}`)
        .then(() => {
          console.log(`Card with ID ${id} unliked successfully`);

          setFavCards((currentFavCards) =>
            currentFavCards.filter((card) => card._id !== id)
          );
          toast.error(" Card has been removed from your favorites", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((error) => {
          console.error("Error unliking the card:", error);
        });
    } else {
      axios
        .patch(`/cards/${id}`)
        .then(() => {
          console.log(`Card with ID ${id} liked successfully`);

          setFavCards((currentFavCards) => [
            ...currentFavCards,
            ...cardsFromServer.filter((card) => card._id === id),
          ]);
          toast.success(
            "Great choice! This card has been added to your favorites. 🌟",
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
        })
        .catch((error) => {
          console.error("Error liking the card:", error);
        });
    }

    const updatedCards = cardsFromServer.map((card) =>
      card._id === id ? { ...card, isLiked: !isCardLiked } : card
    );

    setCardsFromServer(updatedCards);
  };

  return { favCards, cardsFromServer, handleFavClick };
};

export default useHandleFavClick;
