import React from "react";

function RecipeCard(props) {
    const recipes = props.recipesArray
    if (recipes.length === 1) {
        return (
            <div className="recipesContainer">
                <h3 className="mealTitle">Breakfast</h3>
                <img src="./../../../public/resources/placeholder.jpg" alt="" />
                <h2>Recipe name</h2>
                <p>recipe description</p>
            </div>
        )
    } else {
        return (
            <div className="recipesContainer">
                <h3 className="mealTitle">Lunch</h3>
                <div className="inlineRecipeContainer">
                    <img src="./../../../public/resources/placeholder.jpg" alt="" />
                    <div className="recipeNameContainer">
                        <h2>Recipe name</h2>
                        <p>recipe description</p>
                    </div>
                </div>
                <div className="inlineRecipeContainer">
                    <img src="./../../../public/resources/placeholder.jpg" alt="" />
                    <div className="recipeNameContainer">
                        <h2>Recipe name</h2>
                        <p>recipe description</p>
                    </div>
                </div>
                <div className="inlineRecipeContainer">
                    <img src="./../../../public/resources/placeholder.jpg" alt="" />
                    <div className="recipeNameContainer">
                        <h2>Recipe name</h2>
                        <p>recipe description</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeCard;