
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [activeMealIndex, setActiveMealIndex] = useState(0); // State to track active meal index
  const [days, setDays] = useState(null);

  // Axios interceptor for adding JWT token to requests
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Function to fetch recipes
  const fetchRecipes = async () => {
    try {
      const result = await axios.post("http://localhost:3000/weeklyRecipes", { withCredentials: true });
      setRecipes(result.data.weekRecipes[0]);
      console.log(result);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Function to get day based on offset
  function getDay(offset) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    return weekday[d.getDay() + offset];
  }

  // Fetch recipes when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []); // Empty dependency array ensures effect runs only once after mount

  // Function to handle meal title click
  const handleMealTitleClick = (index) => {
    setActiveMealIndex(index); // Set active meal index
  };

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
  function handleRecipes(recipes) {
    if (!recipes || typeof recipes !== 'object') {
      console.error('Recipes object is either null or not an object');
      return [];
  }
    let finalReturn = [];
    Object.keys(recipes).forEach(function (day) {
        const meals = recipes[day];
        const mealsArray = [];
        Object.keys(meals).forEach(function (meal){
          let mealCount = Object.keys(meals).length
          if (meals[meal]) {
              if (meals[meal].main !== null) { //check for the main recipe
                  mealsArray.push(
                      <RecipeCard
                          key={meal.toLowerCase()}
                          recipe={meals[meal].main}
                          type={mealCount === 1? "normall": ""}
                      />
                  );
              }
          }
        })

        const htmlReturn = (
            <div className="dayRecipeDiv" key={day}>
                <h2 className="day">{day}</h2>
                <div className="mealTitleDiv">
                    {mealsArray.map((meal, index) => (
                        <h3 key={index} className={`mealTitle`}>{meal}</h3>
                    ))}
                </div>
                <div className="sideBySide">
                    {mealsArray}
                </div>
            </div>
        );
        finalReturn.push(htmlReturn);
    });
    return finalReturn;
}


  return (
    <div id="recipeDiv">
      {handleRecipes(recipes)}
      
    </div>
  )
}

export default Recipes;

