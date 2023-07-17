import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toHoursAndMinutes from "../helpers/minutesToHours";
import axios from "axios";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FavoriteContext } from "../context/favoriteContext";
export const base = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&uri=`;
const Info = () => {
  //for back button
  const navigate = useNavigate();
  //to get the uri passed from the reciepcard
  const location = useLocation();
  //the data state for consuming
  const [data, setData] = useState("");
  //favoriteContext
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  //converting the uri to request to the api
  const uri = encodeURIComponent(location.state.uri);

  //fetching the data initially
  useEffect(() => {
    async function getData() {
      let response = await axios.get(base + uri);
      setData(response.data.hits[0].recipe);
    }
    getData();
  }, [location]);

  //destructuring the data to consume
  const {
    cautions,
    cuisineType,
    dishType,
    image,
    images,
    ingredientLines,
    label,
    yield: serving,
    mealType,
    source,
    url,
    totalTime,
    calories, // type number
    totalDaily, //object {FAT:{label:'Fat',quantity:3.23232, unit '%'}}
    totalNutrients, // ..same
  } = data;

  //converting the total time from minutes to hours and minutes
  const { hours, minutes } = toHoursAndMinutes(totalTime);

  //checking if the recipe is already present in the favoriets data
  //if present button design red
  let favoritePresent = favorites.some((obj) => obj.uri === data.uri);
  console.log(favorites);
  //checking if data is fetched or not // if undefined , show loading
  if (data) {
    return (
      <div className=" px-4 flex flex-wrap">
        <div className="p-3 flex-1 min-w-[300px]">
          <h1 className="text-[2rem] md:text-[2.5rem] font-bold ">{label}</h1>
          <button
            className="rounded-full mr-3 font-bold  bg-orange-600 text-white p-4 my-4  hover:scale-105 transition"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            ⬅️Back
          </button>
          {favoritePresent ? (
            <button
              onClick={() => removeFavorite(data)}
              className="mr-3 font-bold bg-red-500 text-white p-4 my-4 rounded-md hover:scale-105 transition"
            >
              Remove from Favorites 💖
            </button>
          ) : (
            <button
              className="mr-3 font-bold  bg-orange-600 text-white p-4 my-4 rounded-md hover:scale-105 transition"
              onClick={() => {
                addFavorite(data);
                
              }}
            >
              Add To Favorites 💖
            </button>
          )}

       
          {cautions.length !== 0 ? (
            <p className="text-red-600  rounded-md ">
              This receipe may include : {cautions.map((c) => c + ", ")}
            </p>
          ) : (
            ""
          )}
          <p className="text-lg">
            Yields for : {serving} serving{serving > 1 && "s"}
          </p>
          {totalTime != 0 && (
            <p className="text-lg">
              Prep Time : {hours == 0 ? "" : hours} {hours == 0 ? "" : "hr"}
              {hours > 1 && "s"} {minutes} mins{" "}
            </p>
          )}

          <ol className="list-inside">
            <h2 className="font-bold text-xl ">Ingredients</h2>
            {ingredientLines.map((i) => {
              return (
                <li className="mx-3 underline decoration-orange-500 " key={i}>
                  {i}
                </li>
              );
            })}
          </ol>
          {mealType && <p>Suitable for : {mealType}</p>}
          <a
            href={url}
            className="w-full inline-block px-4 py-3 hover:bg-orange-800 bg-orange-600 text-white font-bold text-center rounded-md"
          >
            Get the full instructions at {source}
          </a>
        </div>{" "}
        <div className="rounded-xl overflow-hidden">
          <img src={images.LARGE ? images.LARGE.url : image} alt="" />
        </div>
        <NutritionFacts
          serving={serving}
          totalDaily={totalDaily}
          totalNutrients={totalNutrients}
          calories={calories}
        ></NutritionFacts>
      </div>
    );
  } else {
    return "loading";
  }
};

export default Info;

function NutritionFacts({ totalDaily, totalNutrients, calories, serving }) {
  const [showTabel, setShowTabel] = useState(true);
  return (
    <motion.div className=" mx-auto w-full md:w-3/4 min-h-[400px]">
      <div className="bg-slate-300 p-4 box-border flex justify-around items-center">
        <h2 className="font-bold text-lg">
          Fat
          <h2>
            {Math.round(totalNutrients.FAT.quantity)} {totalNutrients.FAT.unit}
          </h2>
        </h2>
        <h2 className="font-bold text-lg">
          Protein
          <h2>
            {Math.round(totalNutrients.PROCNT.quantity)}{" "}
            {totalNutrients.PROCNT.unit}
          </h2>
        </h2>
        <h2 className="font-bold text-lg">
          Sodium
          <h2>
            {Math.round(totalNutrients.NA.quantity)} {totalNutrients.NA.unit}
          </h2>
        </h2>
        <h2 className="font-bold text-lg">
          Calories
          <h2>
            {Math.round(totalNutrients.ENERC_KCAL.quantity)}{" "}
            {totalNutrients.ENERC_KCAL.unit}
          </h2>
        </h2>
      </div>
      <button
        className="underline text-lg font-semibold text-orange-800"
        onClick={() => {
          setShowTabel(!showTabel);
        }}
      >
        {showTabel ? "Hide" : "Show"} Full Nurtition Label
      </button>
      <AnimatePresence>
        {showTabel && (
          <NutritionTabel
            totalDaily={totalDaily}
            totalNutrients={totalNutrients}
            serving={serving}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NutritionTabel({ totalDaily, totalNutrients, serving }) {
  console.log(serving);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="flex min-h-screen  flex-col w-full sm:w-[500px] border rounded-xl p-4"
    >
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">Nutrition Facts</h1>
        <p className="text-lg">Serving per recipe : {serving}</p>
        <p className="text-lg">
          Calories : {Math.round(totalNutrients.ENERC_KCAL.quantity)}
        </p>
      </div>
      <p className="w-full text-right py-2 border-b border-slate-300">
        Daily Value %
      </p>
      {Object.keys(totalNutrients).map((key) => {
        const nutrient = totalNutrients[key];
        if (nutrient.quantity == 0) {
          return;
        } else {
          return (
            <p
              key={key}
              className="flex justify-between py-2 border-b border-slate-300"
            >
              <span>
                <b>{nutrient.label}</b>: {nutrient.quantity.toFixed(1)}
                {nutrient.unit}
              </span>
              <span>
                {totalDaily[key] && Math.round(totalDaily[key].quantity) + "%"}
              </span>
            </p>
          );
        }
      })}

      <small>
        * Percent Daily Values are based on a 2,000 calorie diet. Your daily
        values may be higher or lower depending on your calorie needs.
      </small>
      <p>Powered by Edaman APIs Database ©️2023 All Rights Reserved</p>
    </motion.div>
  );
}
