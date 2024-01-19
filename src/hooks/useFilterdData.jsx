import { useContext, useMemo } from "react";
import normalizeFav from "../services/normalizeFavs";
import LogInContext from "../store/loginContext";
import GetCardsContext from "../store/getCardsContext";

const useFilterdData = () => {
  const { logIn } = useContext(LogInContext);
  const { cardsFromServer } = useContext(GetCardsContext);

  const FavFilter = useMemo(() => {
    return normalizeFav(cardsFromServer, logIn ? logIn._id : undefined);
  }, [cardsFromServer, logIn]);

  return FavFilter;
};

export default useFilterdData;
