import { useContext } from "react";
import { FavoriteContext } from "../context/favoriteContext";
import RecipeCard from "../components/RecipeCard";
const Favorites = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  console.log(favorites);
  return (
    <div className=" w-full flex flex-col">
      <h1 className=" w-full py-5 shadow-md text-xl bg-orange-500 text-white sm:text-2xl font-bold text-center">
        My Favorite Recipes
      </h1>
      {favorites.length === 0 && (
        <h1 className="text-3xl font-bold text-center min-h-screen text-orange-500 w-full mt-10">
          NO favorites now. Come back later
        </h1>
      )}
      <div className="flex flex-wrap gap-4">
        {favorites.map((recipe) => {
          return <RecipeCard key={recipe.uri} recipe={recipe}></RecipeCard>;
        })}
      </div>
    </div>
  );
};

export default Favorites;
