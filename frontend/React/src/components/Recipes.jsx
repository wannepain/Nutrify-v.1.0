import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Fetch recipes when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []); // Empty dependency array ensures effect runs only once after mount

  return (
    <div>
      <h2>Recipes</h2>
      <button onClick={fetchRecipes}>Fetch Recipes</button>
    </div>
  );
}

export default Recipes;
