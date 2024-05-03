import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipePopUp from "./RecipePopUp";
import useWindowDimensions from "../utility/getWindowDimension";

function Recipes(props) {
  // const [recipesArray, setRecipesArray] = useState(props.recipesArray);
  const recipesArray = props.recipesArray;
  const {width} = useWindowDimensions();
  const[isRecipeClicked, setIsRecipeClicked] = useState(false);
  const [dataOfClickedRecipe, setDataOfClickedRecipe] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [jsxToClicked, setJsxToClicked] = useState(null);
  const [currentMeal, setCurrentMeal] = useState("breakfast");

  useEffect(() => {
      setIsSmallScreen(width < 720);
  }, [width]);


  function getDay(dayIndex) {
    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
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
  function handleMealClick(event) {
    const clickedMeal = event.currentTarget.getAttribute('data-value');
    setCurrentMeal(clickedMeal);
    console.log(width);
    console.log(isSmallScreen);
  }

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
                data-value={meal}
                className="mealTitle"
                onClick={handleMealClick}
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
                  currentMeal={currentMeal}
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