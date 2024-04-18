import React, { useState, useEffect} from "react";
import axios from "axios";
import useWindowDimensions from "../utility/getWindowDimension";

async function RecipeCard(props) {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [currentIngredients, setCurrentIngredients] = useState(null);
    const {width, height} = useWindowDimensions();
    console.log(width);
    // const recipes = props.recipesArray
    const recipeId= props.recipe
    useEffect(() => {
                const fetchData = async () => {
                    try {
                        const result = await axios.post("http://localhost:3000/getrecipe", { recipeId }, { withCredentials: true });
                        setCurrentRecipe(result.rows[0]);
                        setCurrentIngredients(result.rows[0].ingredients);
                    } catch (error) {
                        console.error("Error fetching recipes:", error);
                    }
                };
                fetchData();
            }, []);
    // for (let i = 0; i < recipes.length; i++) {
    //     const id = recipes[i]; //should be the id of a recipe
    //     console.log(id);
    //     try {
    //         const result = await axios.post("http://localhost:3000/weeklyRecipes", { id: id}, { withCredentials: true });
    //         setCurrentRecipe(result.rows[0]);
    //         setCUrrentIngredients(result.rows[0].ingredients);
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }
    
        if (props.type === "normall") {
            if (width<720) {
                return (
                    <div className="recipesContainer">
                        <img src={currentRecipe.rec_img} alt={currentRecipe.name} />
                        <h2>{currentRecipe.name}</h2>
                        <p>recipe description</p>
                        <div>
                            <h3>Ingredients:</h3>
                            <ul>
                                {currentIngredients.map((value, index)=><li key={index}>{value}</li>)}
                            </ul>
                            <h3>Procedure:</h3>
                            <p>{currentRecipe.procedure}</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="recipesContainer">
                        <img src={currentRecipe.rec_img} alt={currentRecipe.name} />
                        <h2>{currentRecipe.name}</h2>
                        <p>recipe description</p>
                    </div>
                )
            }
        }else{
            if (width<720) {
                return (
                    <div className="recipesContainer">
                        <div className="inlineRecipeContainer">
                            <div className="imgTitleContainer">
                                <img src="./../../../public/resources/placeholder.jpg" alt=""/>
                                <div className="procNameContainer">
                                    <div className="recipeNameContainer">
                                        <h2>Recipe name</h2>
                                        <p>recipe description</p>
                                    </div>
                                    <div className="prepContainer" >
                                    <div className="ingredients">
                                        <h3 className="titleBtn">Ingredients</h3>
                                        <ul className="hiden">
                                            <li>Item</li>
                                        </ul>
                                    </div>
                                    <div className="procedure">
                                        <h3 className="titleBtn">Procedure</h3>
                                        <p className="hiden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus imperdiet. Metus dictum at tempor commodo ullamcorper. Ut eu sem integer vitae justo eget magna fermentum. Malesuada proin libero nunc consequat interdum varius sit. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Vestibulum morbi blandit cursus risus at ultrices. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Adipiscing vitae proin sagittis nisl rhoncus. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="recipesContainer">
                        <div className="inlineRecipeContainer">
                            <div className="imgTitleContainer">
                                <img src="./../../../public/resources/placeholder.jpg" alt=""/>
                                <div className="recipeNameContainer">
                                    <h2>Recipe name</h2>
                                    <p>recipe description</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    

export default RecipeCard;


// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for making HTTP requests
// import useWindowDimensions from "../utility/getWindowDimension";

// function RecipeCard(props) {
//     const [currentRecipes, setCurrentRecipes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { width } = useWindowDimensions();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await Promise.all(props.recipesArray.map(async (id) => {
//                     const response = await axios.post("http://localhost:3000/weeklyRecipes", { id }, { withCredentials: true });
//                     return response.data;
//                 }));
//                 setCurrentRecipes(result);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching recipes:", error);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [props.recipesArray]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="recipesContainer">
//             {currentRecipes.map((recipe, index) => (
//                 <div key={index} className="inlineRecipeContainer">
//                     <div className="imgTitleContainer">
//                         <img src={recipe.rec_img} alt={recipe.name} />
//                         <div className="procNameContainer">
//                             <div className="recipeNameContainer">
//                                 <h2>{recipe.name}</h2>
//                                 <p>{recipe.description}</p>
//                             </div>
//                             <div className="prepContainer">
//                                 <div className="ingredients">
//                                     <h3 className="titleBtn">Ingredients</h3>
//                                     <ul className="hidden">
//                                         {recipe.ingredients.map((ingredient, index) => (
//                                             <li key={index}>{ingredient}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                                 <div className="procedure">
//                                     <h3 className="titleBtn">Procedure</h3>
//                                     <p className="hidden">{recipe.procedure}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default RecipeCard;
