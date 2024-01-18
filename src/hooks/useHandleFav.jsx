import axios from "axios";
import { useContext } from "react";
import GetCardsContext from "../store/getCardsContext";

const useHandleFavClick = () => {
  const { setCardsFromServer } = useContext(GetCardsContext);
  const handleFavClick = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      console.log("data from axios (patch)", data);
      setCardsFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (err) {
      console.log("error from axios (like)", err);
    }
  };
  return {
    handleFavClick,
  };
};

export default useHandleFavClick;
