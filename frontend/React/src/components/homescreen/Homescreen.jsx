import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Recipes from "./Recipes";
import AddRecipe from "./AddRecipe";
function Homescreen(props) {
  const [recipes, setRecipes]= useState(null);
  const [ogRecipes, setOgRecipes] = useState(null);
  const [isOnHomescreen, setIsOnHomescreen] = useState(true);
  //Axios interceptor for adding JWT token to requests
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

      useEffect(() => {
        const source = axios.CancelToken.source();
        let resultRecipes = [];
    
        const fetchRecipes = async () => {
          try {
            const result = await axios.post("http://localhost:3000/weeklyRecipes", {}, {
              withCredentials: true
            });
            setOgRecipes(result.data.weekRecipes[0]);
            Object.keys(result.data.weekRecipes[0]).forEach((day)=>{
              resultRecipes.push(result.data.weekRecipes[0][day]);
              // console.log(resultRecipes);
            })
            setRecipes(resultRecipes);
            // console.log(result);
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log('Request canceled', error.message);
            } else {
              console.error('Error fetching recipes:', error);
            }
          }
        };
    
        fetchRecipes();
    
        // Cleanup function to cancel the request
        return () => {
          source.cancel('Component unmounted'); // Cancel the request on component unmount
        };
      }, []);

    return <div id="homescreenDiv" className={!isOnHomescreen && "homescreenCenter"}>
        {isOnHomescreen? <Recipes recipesArray={recipes} ogRecipes={ogRecipes}/> : <AddRecipe />}
        <NavBar setIsOnHomescreen={setIsOnHomescreen}/>
      </div>
}
export default Homescreen;