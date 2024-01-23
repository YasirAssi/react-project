import axios from "axios";
import { useContext } from "react";
import GetCardsContext from "../store/getCardsContext";
import { toast } from "react-toastify";

const useHandleFavClick = () => {
  const { setCardsFromServer } = useContext(GetCardsContext);
  const handleFavClick = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      setCardsFromServer((currentDataFromServer) => {
        let cardIndex = currentDataFromServer.findIndex(
          (card) => card._id === id
        );
        if (cardIndex >= 0) {
          currentDataFromServer[cardIndex] = data;
        }
        return [...currentDataFromServer];
      });
      toast("Check your favorites in FavCards", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      toast.error("Failed to add the card to your favorites", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return {
    handleFavClick,
  };
};

export default useHandleFavClick;

// if the card is already got the patch, add tost with error removing the card from the favs
