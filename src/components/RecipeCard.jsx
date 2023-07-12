import React from "react";
import toHoursAndMinutes from "../helpers/minutesToHours";
import { Link } from "react-router-dom";
import {delay, motion} from 'framer-motion'

const RecipeCard = ({ recipe }) => {
  const { uri, image, images, label, ingredients, totalTime } = recipe;
  const { hours, minutes } = toHoursAndMinutes(totalTime);
  return (
    <Link className="m-0 p-0" to={`/recipes/'${label}'`} state={{ uri }}>
      <motion.article
      initial={{
       opacity:0
      }}
      
      transition={{
        
        duration:0.5,
        
        type:'spring',
      
      }}
     
      whileInView={{
        
        opacity:1
      }}
      exit={{
        opacity:0
      }}
      whileHover={{
        scale:1.1
      }}
      className="w-full shadow-2xl group rounded-xl overflow-hidden   md:w-[250px]   flex flex-col border hover:border-orange-500">
        <div className="">
          <img
            src={image ? image : "https://loremflickr.com/300/300"}
            alt="label"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="p-5 ">
          <h2 className="text-slate-900 font-bold text-xl group-hover:text-orange-600 ">{label}</h2>
          <ul>
            {minutes ? (
              <li>
                {hours==0? '' : hours} {hours==0?'':'hr'}{hours > 1 && "s"} {minutes} mins
              </li>
            ) : (
              ""
            )}
            <li>{ingredients.length} Ingredients</li>
          </ul>
        </div>
      </motion.article>
    </Link>
  );
};

export default RecipeCard;
