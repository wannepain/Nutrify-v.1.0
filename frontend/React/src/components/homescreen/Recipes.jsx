import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function Recipes(props) {
  const [recipes, setRecipes] = useState([]);

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
      const result = await axios.get("http://localhost:3000/weeklyRecipes", { withCredentials: true });
      setRecipes(result.data.weekRecipes);
      console.log(result);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  function getDay(offset) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    return weekday[d.getDay() + offset];
  }
  // Fetch recipes when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []); // Empty dependency array ensures effect runs only once after mount

  return (
    <div id="recipeDiv">
        <div>
          <h2 className="day">{getDay(0)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello",0]}/>
            <RecipeCard recipesArray={["hello",0]}/>
          </div>
        </div>
        <div>
          <h2 className="day">{getDay(1)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>
        <div>
          <h2 className="day">{getDay(2)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>
      
        <div>
          <h2 className="day">{getDay(3)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>
        <div>
          <h2 className="day">{getDay(4)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>
        <div>
          <h2 className="day">{getDay(5)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>

        <div>
          <h2 className="day">{getDay(6)}</h2>
          <div className="sideBySide">
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
            <RecipeCard recipesArray={["hello"]}/>
          </div>
        </div>
      {/* <button onClick={fetchRecipes}>Fetch Recipes</button> */}
    </div>
  );
}

export default Recipes;
