import { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (newRecipe) => {
    setFavorites((current) => {
      return [...current, newRecipe];
    });
  };
  const removeFavorite= (data)=>{
    setFavorites(current =>{
        return current.filter(recipe => recipe.uri !== data.uri)
    })
  }
  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite , removeFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );
};
