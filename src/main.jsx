import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContextProvider } from "./context/favoriteContext.jsx";
import { SearchContextProvider } from "./context/searchContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <FavoriteContextProvider>
          <App />
        </FavoriteContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
