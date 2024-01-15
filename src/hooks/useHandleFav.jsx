import axios from "axios";
import { useContext, useEffect } from "react";
import GetCardsContext from "../store/getCardsContext";
import { toast } from "react-toastify";

const useHandleFavClick = () => {
  let { favCards, setFavCards, setCardsFromServer, cardsFromServer } =
    useContext(GetCardsContext);

  // useEffect(() => {
  //   // Add any additional logic you want to run on mount or when favCards/cardsFromServer change
  // }, [favCards, cardsFromServer]);

  const handleFavClick = (id) => {
    const isCardLiked = favCards.some((card) => card._id === id);

    if (isCardLiked) {
      axios
        .patch(`/cards/${id}`)
        .then(() => {
          setFavCards((prevFavCards) =>
            prevFavCards.filter((card) => card._id !== id)
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
          setFavCards((prevFavCards) => [
            ...prevFavCards,
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
