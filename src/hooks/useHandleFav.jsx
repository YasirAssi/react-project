import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GetCardsContext from "../store/getCardsContext";
import { toast } from "react-toastify";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../services/storageService";

const useHandleFavClick = () => {
  let { favCards, setFavCards, setCardsFromServer, cardsFromServer } =
    useContext(GetCardsContext);
  let { logIn } = useContext(LogInContext);
  const navigate = useNavigate();

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
    let token = getToken();
    let userData = jwtDecode(token);

    if (userData) {
      const isCardFav = favCards.some((card) => card._id === id);
      try {
        console.log("Updating favorites:", id, "Is Card Favorite?", isCardFav);

        setFavCards((currentFavCards) => {
          if (isCardFav) {
            return currentFavCards.filter((card) => card._id !== id);
          } else {
            return [
              ...currentFavCards,
              ...cardsFromServer.filter((card) => card._id === id),
            ];
          }
        });

        console.log("Sending PATCH request to server...");

        await axios.patch(`/cards/${id}`);

        console.log("Patch request successful!");

        toast(
          `Card has been ${
            isCardFav ? "removed from" : "added to"
          } your favorites. ${isCardFav ? "😢" : "🌟"}`,
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
          card._id === userData._id ? { ...card, isFav: !isCardFav } : card
        );
        setCardsFromServer(updatedCards);

        console.log("State updated successfully!");
      } catch (error) {
        console.error("Error updating favorites:", error);

        setFavCards((currentFavCards) => {
          if (isCardFav) {
            return [
              ...currentFavCards,
              ...cardsFromServer.filter((card) => card._id === id),
            ];
          } else {
            return currentFavCards.filter((card) => card._id !== id);
          }
        });
        toast.error(
          `Error ${
            isCardFav ? "un" : ""
          }liking the card. Please try again later.`,
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
    }
  };

  return { favCards, cardsFromServer, handleFavClick };
};

export default useHandleFavClick;

// i get
