import logo from "./logo.svg";
import "./App.css";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";

function App() {
  return (
    <LayoutComponent>
      <Router />
    </LayoutComponent>
  );
}

export default App;
