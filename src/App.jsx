import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [logIn, setLogIn] = useState(null);

  return (
    <LoginContext.Provider value={{ logIn, setLogIn }}>
      <ToastContainer />
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </LoginContext.Provider>
  );
}

export default App;

//  <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
