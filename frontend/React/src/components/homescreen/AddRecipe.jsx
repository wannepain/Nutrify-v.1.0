import React, { useState } from "react";
import useWindowDimensions from "../utility/getWindowDimension";

function AddRecipe(props) {
    const { width } = useWindowDimensions();
    const [addedImg, setAddedImg] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        //make an axios post handle errors 
    }

    function handleClick(event) {
        const gotClicked = event.currentTarget.getAttribute('data-value');
    }

    let jsxToRender
    if (width > 720 ) { // on pc 
        jsxToRender = (
            <form onSubmit={handleSubmit}>
                <div id="parentRecipeDiv">
                    <div id="firstColumnDiv">
                        <div id="imgInputDiv">
                            <img src={addedImg? addedImg : "./../../../public/resources/placeholder.jpg"} alt="recipe image" />
                            <input type="file" name="rec_img" id="rec_img"/>
                        </div>
                        <label htmlFor="rec_name">Recipe Name</label>
                        <input type="text" name="rec_name" id="rec_name" />

                        <label htmlFor="rec_description">Recipe Description</label>
                        <textarea name="rec_description" id="rec_description" cols="30" rows="5"></textarea>

                        <button type="submit" value="submit">Submit</button>
                    </div>

                    <div id="secondColumnDiv">
                        <div id="allergenInputDiv">
                            <input type="text" name="allergen_input" id="allergen_input" />
                            <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
                        </div>
                        <div id="allergenDiv">

                        </div>
                        <div className="sideBySideMacro">
                            <div className="column marginRight">
                                <label htmlFor="cals_input">Calories</label>
                                <input type="number" name="cals" id="cals_input" />
                            </div>
                            
                            <div className="column">
                                <label htmlFor="prots_input">Proteins</label>
                                <input type="number" name="prots" id="prots_input" />
                            </div>
                        </div>
                        
                        <div className="sideBySideMacro">
                            <div className="column marginRight">
                                <label htmlFor="fats_input">Fats</label>
                                <input type="number" name="fats" id="fats_input" />
                            </div>
                            
                            <div className="column">
                                <label htmlFor="carbs_input">Carbohydrates</label>
                                <input type="number" name="carbs" id="carbs_input" />
                            </div>
                        </div>
                        <div id="macroComment">
                            <p>Macronutriens for the whole meal</p>
                        </div>
                        <div id="dietDiv">
                            <button type="button" value="omnivorous" onClick={handleClick} data-value="diet">Omnivorous</button>
                            <button type="button" value="vegetarian" onClick={handleClick} data-value="diet">Vegetarian</button>
                            <button type="button" value="vegan" onClick={handleClick} data-value="diet">Vegan</button>
                        </div>
                    </div>

                    <div id="thirdColumnDiv">
                        <div id="ingredientsDiv">
                            <label htmlFor="ingredients_input">Ingredients</label>
                            <textarea name="ingredients" id="ingredients_input" cols="30" rows="10"></textarea>
                        </div>
                        <div id="mealSmallDiv">
                            <button type="button" value="breakfast" onClick={handleClick} data-value="meal">Breakfast</button>
                            <button type="button" value="lunch" onClick={handleClick} data-value="meal">Lunch</button>
                            <button type="button" value="dinner" onClick={handleClick} data-value="meal">Dinner</button>
                            <button type="button" value="snack" onClick={handleClick} data-value="meal">Snack</button>
                        </div>
                    </div>

                    <div id="fourthColumnDiv">
                        <div id="procedureDiv">
                            <label htmlFor="procedure_input">Procedure</label>
                            <textarea name="procedure" id="procedure_input" cols="30" rows="10"></textarea>
                        </div>
                        <div id="courseSmallDiv">
                            <button type="button" value="first" onClick={handleClick} data-value="course">First course</button>
                            <button type="button" value="main" onClick={handleClick} data-value="course">Main course</button>
                            <button type="button" value="dessert" onClick={handleClick} data-value="course">Dessert</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    } else { // on mobile
        jsxToRender = (
            <form action="">
                <div>
                    <div id="firstHalfDiv">
                        <div id="imgInputDiv">
                            <img src={addedImg? addedImg : "./../../../public/resources/placeholder.jpg"} alt="recipe image" />
                            <input type="file" name="rec_img" id="rec_img" className="hidden"/>
                        </div>
                        <div id="allergenSideBySideDiv">
                            <input type="text" name="allergens" id="allergen_input" />
                            <button type="button"  onClick={handleClick} data-value="add_allergen"><img src="./../../public/resources/add_recipe_icon.svg" alt="Add"/></button>
                        </div>

                        <textarea name="ingredients" id="ingredient_input" cols="30" rows="10"></textarea>
                        
                        <label htmlFor="cals_input">Calories</label>
                        <input type="number" name="cals" id="cals_input" />
                        <label htmlFor="prots_input">Proteins</label>
                        <input type="number" name="prots" id="prots_input" />
                        <label htmlFor="fats_input">Fats</label>
                        <input type="number" name="fats" id="fats_input" />
                        <label htmlFor="carbs_input">Carbs</label>
                        <input type="number" name="carbs" id="carbs_input" />

                        <button type="button" value="breakfast" onClick={handleClick} data-value="meal">Breakfast</button>
                        <button type="button" value="dinner" onClick={handleClick} data-value="meal">Dinner</button>
                    </div>
                    <div id="secondHalfDiv">
                        <label htmlFor="rec_name">Recipe name</label>
                        <input type="text" name="rec_name" id="rec_name" />

                        <label htmlFor="rec_description">Description</label>
                        <textarea name="description" id="rec_description" cols="30" rows="5"></textarea>

                        <div>
                            {/* add the allergens here dinamically */}
                        </div>

                        <label htmlFor="rec_description">Procedure</label>
                        <textarea name="procedure" id="rec_procedure" cols="30" rows="10"></textarea>

                        <button type="button" value="omnivorous" onClick={handleClick} data-value="diet">Omnivorous</button>
                        <button type="button" value="vegetarian" onClick={handleClick} data-value="diet">Vegetarian</button>
                        <button type="button" value="vegan" onClick={handleClick} data-value="diet">Vegan</button>

                        <button type="button" value="lunch" onClick={handleClick} data-value="meal">Lunch</button>
                        <button type="button" value="snack" onClick={handleClick} data-value="meal">Snack</button>
                    </div>
                    <button type="button" value="first" onClick={handleClick} data-value="course">First</button>
                    <button type="button" value="main" onClick={handleClick} data-value="course">Main</button>
                    <button type="button" value="desert" onClick={handleClick} data-value="course">Desert</button>

                    <button type="submit" value="submit">Submit</button>
                </div>
            </form>
            
        )
    }

    return jsxToRender;
}

export default AddRecipe;