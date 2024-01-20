import axios from "axios";
import LogInContext from "../store/loginContext";
import GetCardsContext from "../store/getCardsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";

const useHandleDelete = () => {
  const { setCardsFromServer } = useContext(GetCardsContext);
  const { logIn } = useContext(LogInContext);
  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    const fetchData = async () => {
      try {
        await axios.delete("/cards/" + id).then(({ data }) => {
          console.log("data", data);
          console.log("data from axios (delete)", data);
          setCardsFromServer((currentCardsFromServer) => {
            return currentCardsFromServer.filter((card) => card._id !== id);
          });
        });
        toast("🦄 Card Is Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        toast.warn("Only Admin or LoggedIn Owner can Delete!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        if (!logIn) navigate(ROUTES.LOGIN);
      }
    };
    fetchData();
  };
  return { handleDeleteClick };
};
export default useHandleDelete;
