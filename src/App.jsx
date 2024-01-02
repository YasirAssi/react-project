// import "./App.css";
import { useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import CounterSettingContext from "./store/counterContext";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <CounterSettingContext.Provider value={{ counter, setCounter }}>
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </CounterSettingContext.Provider>
  );
}

export default App;
