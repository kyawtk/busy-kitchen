import { useAxios } from "../hooks/useAxios";
import { AnimatePresence } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
const base = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&dishType=Drinks`;

const Drinks = () => {
  const { data, loading, error, fetchData, nextPage } = useAxios(base);

  return (
    <div className="">
      <button
        className="w-full  mx-auto text-orange-600 text-center p-6 hover:text-orange-800 active:text-orange-400"
        onClick={() => {
          fetchData(nextPage);
        }}
      >
        More Recipes
      </button>
      
         <div className="mt-8 flex flex-wrap justify-center items-center gap-5 p-1 md:p-2 lg:p-3">
        <AnimatePresence>
          {data &&
            data.hits.map((r) => {
              return <RecipeCard key={r.recipe.shareAs} {...r} />;
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Drinks;
