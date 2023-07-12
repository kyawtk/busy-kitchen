import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContextProvider } from "./context/favoriteContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoriteContextProvider>
        <App />
      </FavoriteContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
