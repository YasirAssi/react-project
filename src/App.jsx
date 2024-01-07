import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LogInContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [logIn, setLogIn] = useState(null);

  return (
    <LogInContext.Provider value={{ logIn, setLogIn }}>
      <ToastContainer />
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </LogInContext.Provider>
  );
}

export default App;
