import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogInContext from "../store/loginContext";
import GetCardsContext from "../store/getCardsContext";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Typography from "@mui/material/Typography";
import { getToken } from "../services/storageService";

const useHandleEditCard = () => {
  const { cardsFromServer } = useContext(GetCardsContext);
  const { logIn } = useContext(LogInContext);
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    if (!logIn) {
      toast.warn("Only Admin or Card Owner can Edit!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    let token = getToken();
    let userData = jwtDecode(token);

    if (!id || !cardsFromServer || !logIn) {
      return;
    }

    if (cardsFromServer && cardsFromServer.length > 0) {
      const card = cardsFromServer.find((item) => item._id === id);

      if (
        card &&
        ((logIn && logIn.isBusiness && card.user_id === userData._id) ||
          (logIn && logIn.isAdmin))
      ) {
        navigate(`${ROUTES.EDITCARD}/${id}`);
      } else {
        toast.warn("Only Admin or Card Owner can Edit!", {
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
    } else {
      return <Typography>Could not find any items</Typography>;
    }
  };

  return { handleEditClick };
};

export default useHandleEditCard;
