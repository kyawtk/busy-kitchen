import { useReducer, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
const base = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&q=`;

const Home = () => {
  const searchRef = useRef(null);
  const [nextPage, setNextPage] = useState(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  async function getData() {
    setLoading(true);
    let response = await axios.get(`${base}${searchRef.current.value}`);
    setData(response.data.hits);
    setNextPage(response.data._links.next.href);
    setLoading(false);
   
  }
  async function getMoreData(url) {
    setLoading(true);
    let response = await axios.get(url);
    setData(response.data.hits);
    setNextPage(response.data._links.next.href);
    setLoading(false);
   
  }
  return (
    <div className="bg-[#FDFDF0]">
      <SearchBar
        loading={loading}
        searchRef={searchRef}
        getData={getData}
      ></SearchBar>
      <div className="mt-8 flex flex-wrap justify-center items-center gap-5 p-1 md:p-2 lg:p-3">
        <AnimatePresence>
          {data &&
            data.map((r) => {
              return <RecipeCard key={r.recipe.shareAs} {...r} />;
            })}
        </AnimatePresence>
      </div>

      {data && (
        <button
          className="w-full  mx-auto text-orange-600 text-center p-6 hover:text-orange-800 active:text-orange-400"
          onClick={() => {
            getMoreData(nextPage);
            window.scrollTo({ top: 10, behavior: "smooth" });
          }}
        >
          More Recipes
        </button>
      )}
      {data && (
        <button
          className="w-full  mx-auto text-orange-600 text-center p-6 hover:text-orange-800 active:text-orange-400"
          onClick={() => window.scrollTo({ top: 10, behavior: "smooth" })}
        >
          Go to Top
        </button>
      )}
    </div>
  );
};

export default Home;
