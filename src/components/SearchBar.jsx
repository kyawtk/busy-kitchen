
import { AnimatePresence } from "framer-motion";
const SearchBar = ({ searchRef, loading, getData }) => {
  const base = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
    import.meta.env.VITE_APP_ID
  }&app_key=${import.meta.env.VITE_APP_KEY}`;

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      
      getData();
    }
  };

  return (
    <div className="z-40 bg-orange-400  p-3 flex flex-col justify-center items-center shadow-lg  min-h-[70vh]">
      <h2 className="text-3xl font-bold text-white antialiased my-3">
        What would you like to cook today?
      </h2>
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        <input
          className="p-3 text-center rounded-md text-slate-800   text-xl w-full font-bold md:max-w-[500px] transition-all border-none outline-none focus:shadow-2xl  "
          onKeyDown={handleKeypress}
          ref={searchRef}
          type="text"
          placeholder="Chicken , beef, coffee, tea , dumplings"
        />
        <AnimatePresence>
        {loading ? (
          <figure className="text-5xl animate-spin ">🍩</figure>
        ) : (
          <button
            className="bg-red-500 my-3 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            onClick={getData}
          >
            Search
          </button>
        )}</AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
