
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import RecipeCard from "./RecipeCard";

// function Recipes(props) {
//   console.log(props.recipesArray);
//   const recipesArray = props.recipesArray

//   if (recipesArray && recipesArray != null) {
//     recipesArray.map((value, index)=>{
//       console.log(value);
//       if (value.breakfast && value.lunch || value.lunch && value.dinner) { // minimaly two recipes are present
//         return (
//           <div id="recipeDiv">
//             <div className="dayRecipeDiv">
//               <h2 className="day">{getDay(index)}</h2>
//               <div className="mealTitleDiv">
//                 {/* Mapping through meal titles and rendering them */}
//                 {["Breakfast", "Snack", "Lunch", "Snack", "Dinner"].map((meal, index) => (
//                   <h3 key={index} className={`mealTitle ${index === activeMealIndex ? 'active' : ''}`} onClick={() => handleMealTitleClick(index)}>{meal}</h3>
//                 ))}
//               </div>
//               <div className="sideBySide">
//                 {/* Rendering RecipeCard components */}
//                 {recipes.map((recipe, index) => (
//                   <RecipeCard key={index} recipesArray={recipe} size={index === 0 ? "large" : "small"} />
//                 ))}
//               </div>
//             </div>
//         </div>
//         )
//       } else { // one recipe is present 
        
//       }
//     })
    
//   } else {
//     return (
//       <div id="recipeDiv">
//         <h1>Error occured</h1>
//       </div>
//     )
//   }
  
// }

// export default Recipes;

import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipePopUp from "./RecipePopUp";

function Recipes(props) {
  // const [recipesArray, setRecipesArray] = useState(props.recipesArray);
  const recipesArray = props.recipesArray;
  const[isRecipeClicked, setIsRecipeClicked] = useState(false);
  const [dataOfClickedRecipe, setDataOfClickedRecipe] = useState(null);
  const [jsxToClicked, setJsxToClicked] = useState(null);

  function getDay(dayIndex) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // Handle negative or out-of-range indexes to avoid errors
    const adjustedIndex = (dayIndex % 7 + 7) % 7; // Ensures index is always between 0 and 6
    return weekday[adjustedIndex];
  }

  function handleCardClick(recipeData) {
    setDataOfClickedRecipe(recipeData);
    setIsRecipeClicked(true);
    setJsxToClicked(<RecipePopUp recipeData={recipeData} setIsRecipeClicked={setIsRecipeClicked} />);
  }

  // Function to handle meal title click
  const handleMealTitleClick = (index) => {
    setActiveMealIndex(index); // Set active meal index
  };

  if (!recipesArray) {
    return (
      <div id="recipeDiv">
        <h1>Error occurred</h1>
      </div>
    );
  }

  return (
    <div id="recipeDiv">
      {recipesArray.map((dayRecipes, dayIndex) => (
        <div key={dayIndex} className="dayRecipeDiv">
          <h2 className="day">{getDay(dayIndex)}</h2>
          <div className="mealTitleDiv">
            {/* Get available meals for this day */}
            {Object.keys(dayRecipes).map((meal, index) => (
              <h3
                key={index}
                // className={`mealTitle ${
                //   index === activeMealIndex ? "active" : ""
                // }`}
                className="mealTitle"
                onClick={() => handleMealTitleClick(index)}
              >
                {meal}
              </h3>
            ))}
          </div>
          <div className="sideBySide">
            {/* Render RecipeCard for each available meal */}
            {Object.keys(dayRecipes).map((meal, index) => {
              const recipe = dayRecipes[meal];
              const hasMultipleCourses = recipe && Object.keys(recipe).length > 1;
              return (
                <RecipeCard
                  key={`${dayIndex}-${index}`}
                  recipe={recipe}
                  setIsRecipeClicked={handleCardClick}
                  // size={index === 0 ? "large" : "small"}
                />
              );
            })}
          </div>
        </div>
      ))}
      {isRecipeClicked && jsxToClicked}
    </div>
  );
}

export default Recipes;








  // const [recipes, setRecipes] = useState(null);
  // const [activeMealIndex, setActiveMealIndex] = useState(0); // State to track active meal index
  // const [days, setDays] = useState(null);
  // const [htmlRecipes, setHtmlRecipes] = useState(null);

  // Axios interceptor for adding JWT token to requests
  // axios.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );


  // return (
  //   <div id="recipeDiv">
  //       <div className="dayRecipeDiv">
  //         <h2 className="day">{getDay(0)}</h2>
  //         <div className="mealTitleDiv">
  //           {/* Mapping through meal titles and rendering them */}
  //           {["Breakfast", "Snack", "Lunch", "Snack", "Dinner"].map((meal, index) => (
  //             <h3 key={index} className={`mealTitle ${index === activeMealIndex ? 'active' : ''}`} onClick={() => handleMealTitleClick(index)}>{meal}</h3>
  //           ))}
  //         </div>
  //         <div className="sideBySide">
  //           {/* Rendering RecipeCard components */}
  //           {recipes.map((recipe, index) => (
  //             <RecipeCard key={index} recipesArray={recipe} size={index === 0 ? "large" : "small"} />
  //           ))}
  //         </div>
  //       </div>
  //     {/* <button onClick={fetchRecipes}>Fetch Recipes</button> */}
  //   </div>
  // );

  // async function handleRecipes () {
  //   for (let i = 0; i < recipesArray.length; i++) {
      
  //   }
  // }
  // Function to get day based on offset
  // function getDay(offset) {
  //   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  //   const d = new Date();
  //   return weekday[d.getDay() + offset];
  // }

  // Fetch recipes when component mounts

  // Function to handle meal title click
  // const handleMealTitleClick = (index) => {
  //   setActiveMealIndex(index); // Set active meal index
  // };


//   function handleRecipes() {
//     if (!recipes || typeof recipes !== 'object') {
//       console.error('Recipes object is either null or not an object');
//       return [];
//   }
//     let finalReturn = [];
//     Object.keys(recipes).forEach(function (day) {
//         const meals = recipes[day];
//         const mealsArray = [];
//         Object.keys(meals).forEach(function (meal){
//           let mealCount = Object.keys(meals).length
//           if (meals[meal]) {
//               if (meals[meal].main !== null) { //check for the main recipe
//                 console.log(meals[meal].main);
//                   mealsArray.push(
//                       <RecipeCard
//                           key={meal.toLowerCase()}
//                           recipe={meals[meal].main}
//                           type={mealCount === 1? "normall": ""}
//                       />
//                   );
//               } else{
//                 console.log("error occured", meals[meal]);
//               }
//           }
//         })

//         const htmlReturn = (
//             <div className="dayRecipeDiv" key={day}>
//                 <h2 className="day">{day}</h2>
//                 <div className="mealTitleDiv">
//                     {mealsArray.map((meal, index) => (
//                         <h3 key={index} className={`mealTitle`}>{meal}</h3>
//                     ))}
//                 </div>
//                 <div className="sideBySide">
//                     {mealsArray}
//                 </div>
//             </div>
//         );
//         finalReturn.push(htmlReturn);
//     });
//     setHtmlRecipes(finalReturn);
// }
