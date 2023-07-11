import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
export const base = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&uri=`;
const Info = () => {
  const location = useLocation();
  const uri = encodeURIComponent(location.state.uri);
  const [data, setData] = useState('');

  useEffect(() => {
    async function getData() {
      let response = await axios.get(base + uri);
      setData(response.data.hits[0].recipe);
    }
    getData();
  }, [location]);
  useEffect(() => {}, [data]);
  console.log(data);
  const {
    cautions,
    cuisineType,
    dishType,
    image,
    images,
    ingredientLines,
    label,
    mealType,
    source,
    url,
    totalTime,
  } = data;
  if (data) {
    return (
      <div className="flex flex-wrap">
        <div className="">
          <img
            src={images.LARGE ? images.LARGE.url : image}
            alt=""
          />
        </div>
        <div className="">
          <h1>{ label}</h1>
          <button className="bg-orange-600 text-white p-4 m-4">
            Add To Favorites
          </button>
          {cautions.length !== 0 ? (
            <p>This receipe includes : {cautions.map((c) => c+ ', ')}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    return "loading";
  }
};

export default Info;
