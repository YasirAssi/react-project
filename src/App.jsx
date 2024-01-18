import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LogInContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import GetCardsContext from "./store/getCardsContext";

function App() {
  const [logIn, setLogIn] = useState(null);
  const [cardsFromServer, setCardsFromServer] = useState([]);
  const [cardsCopy, setCardsCopy] = useState([]);

  return (
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
  );
}

export default App;
