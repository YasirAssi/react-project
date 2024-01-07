import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import CounterSettingContext from "./store/counterContext";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [counter, setCounter] = useState(0);
  // const [logIn, setLogIn] = useState(false);
  const [logIn, setLogIn] = useState(null);

  return (
    <CounterSettingContext.Provider value={{ counter, setCounter }}>
      <LoginContext.Provider value={{ logIn, setLogIn }}>
        <ToastContainer />
        <LayoutComponent>
          <Router />
        </LayoutComponent>
      </LoginContext.Provider>
    </CounterSettingContext.Provider>
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
