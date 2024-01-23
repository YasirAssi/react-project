import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LogInContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import GetCardsContext from "./store/getCardsContext";
import GetUsersContext from "./store/usersContext";

function CardifyHubApp() {
  const [logIn, setLogIn] = useState(null);
  const [cardsFromServer, setCardsFromServer] = useState([]);
  const [cardsCopy, setCardsCopy] = useState([]);
  const [userCopy, setUserCopy] = useState([]);
  const [userArr, setUserArr] = useState([]);

  return (
    <GetUsersContext.Provider
      value={{ userCopy, setUserCopy, userArr, setUserArr }}
    >
      <GetCardsContext.Provider
        value={{
          cardsFromServer,
          setCardsFromServer,
          setCardsCopy,
          cardsCopy,
        }}
      >
        <LogInContext.Provider value={{ logIn, setLogIn }}>
          <ToastContainer />
          <LayoutComponent>
            <Router />
          </LayoutComponent>
        </LogInContext.Provider>
      </GetCardsContext.Provider>
    </GetUsersContext.Provider>
  );
}

export default CardifyHubApp;
