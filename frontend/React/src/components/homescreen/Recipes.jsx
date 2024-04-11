// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import RecipeCard from "./RecipeCard";

// function Recipes(props) {
//   const [recipes, setRecipes] = useState([]);
//   // Axios interceptor for adding JWT token to requests
//   axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   function changeRecipes() {
    
//   }
//   // Function to fetch recipes
//   const fetchRecipes = async () => {
//     try {
//       const result = await axios.get("http://localhost:3000/dailyRecipes", { withCredentials: true });
//       setRecipes(result.data.weekRecipes);
//       console.log(result);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };
//   function getDay(offset) {
//     const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//     const d = new Date();
//     return weekday[d.getDay() + offset];
//   }
//   // Fetch recipes when component mounts
//   useEffect(() => {
//     fetchRecipes();
//   }, []); // Empty dependency array ensures effect runs only once after mount

//   return (
//     <div id="recipeDiv">
//         <div className="dayRecipeDiv">
//           <h2 className="day">{getDay(0)}</h2>
//           <div className="mealTitleDiv">
//             <h3 className="mealTitle currentMeal" onClick={changeRecipes}>Breakfast</h3>
//             <h3 className="mealTitle">Snack</h3>
//             <h3 className="mealTitle">Lunch</h3>
//             <h3 className="mealTitle">Snack</h3>
//             <h3 className="mealTitle">Dinner</h3>
//           </div>
//           <div className="sideBySide">
//             <RecipeCard recipesArray={["hello"]} />
//             <RecipeCard recipesArray={["hello",0]} size="small" />
//             <RecipeCard recipesArray={["hello",0]} size="small"/>
//           </div>
//         </div>
//       {/* <button onClick={fetchRecipes}>Fetch Recipes</button> */}
//     </div>
//   );
// }

// export default Recipes;

import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [activeMealIndex, setActiveMealIndex] = useState(0); // State to track active meal index

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
      const result = await axios.get("http://localhost:3000/dailyRecipes", { withCredentials: true });
      setRecipes(result.data.weekRecipes);
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

  return (
    <div id="recipeDiv">
        <div className="dayRecipeDiv">
          <h2 className="day">{getDay(0)}</h2>
          <div className="mealTitleDiv">
            {/* Mapping through meal titles and rendering them */}
            {["Breakfast", "Snack", "Lunch", "Snack", "Dinner"].map((meal, index) => (
              <h3 key={index} className={`mealTitle ${index === activeMealIndex ? 'active' : ''}`} onClick={() => handleMealTitleClick(index)}>{meal}</h3>
            ))}
          </div>
          <div className="sideBySide">
            {/* Rendering RecipeCard components */}
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipesArray={recipe} size={index === 0 ? "large" : "small"} />
            ))}
          </div>
        </div>
      {/* <button onClick={fetchRecipes}>Fetch Recipes</button> */}
    </div>
  );
}

export default Recipes;

