import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LogInContext from "../store/loginContext";
import { getToken } from "../services/storageService";

const useAutoLogin = () => {
  const { setLogIn } = useContext(LogInContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setFinishAutoLogin(true);
      return;
    }
    let userData = jwtDecode(token);
    if (!userData || !userData._id) {
      setFinishAutoLogin(true);
      return;
    }
    axios
      .get("/users/" + userData._id)
      .then(({ data }) => {
        setLogIn(userData);
        setFinishAutoLogin(true);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, [setLogIn]);

  return finishAutoLogin;
};

export default useAutoLogin;
