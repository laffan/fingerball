import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Play from "./pages/Play";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles.css';

const router = createBrowserRouter([
  {
    path: "/fingerball",
    element: <Home/>,
  },
  {
    path: "/fingerball/play",
    element: <Play/>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <main className="Container">
    <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);