import  { useContext } from 'react'
import { FavoriteContext } from '../context/favoriteContext'
import RecipeCard from '../components/RecipeCard'
const Favorites = () => {
  const {favorites, setFavorites} = useContext(FavoriteContext)
  console.log(favorites)
  return (
    <div className=" w-full flex flex-wrap">
      <h1 className=' w-full py-5 shadow-md text-xl bg-orange-500 text-white sm:text-2xl font-bold text-center'>My Favorite Recipes</h1>
      {favorites.map(recipe=> {
        return <RecipeCard key={recipe.uri} recipe={recipe}></RecipeCard>
      })}
    </div>
  )
}

export default Favorites