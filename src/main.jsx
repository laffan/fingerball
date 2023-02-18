import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Play from "./pages/Play";
import "./styles.css";

const App = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const game = queryParameters.get("game");
  return game ? <Play gameId={game} /> : <Home />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
