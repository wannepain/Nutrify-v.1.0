import React, { useState, useEffect } from "react";
import axios from "axios";
import useWindowDimensions from "../utility/getWindowDimension";

function RecipeCard(props) {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [currentIngredients, setCurrentIngredients] = useState(null);
    // const [requestData, setRequestData] = useState({});
    const recipeIds = [];
    const recipeData =[];
    // const [recipeData, setRecipeData] = useState([]);
    const { desert, main, first } = props.recipe;
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const fetchData = async () => {
            // let requestData = {};
            if (first != null) recipeIds.push(first);
            if (main != null) recipeIds.push(main);
            if (desert != null) recipeIds.push(desert);

            recipeIds.map(async (currentId,index)=>{
                try {
                    console.log(currentId);
                    const result = await axios.post("http://localhost:3000/getrecipe", {id: currentId});
                    recipeData.push(result.data.data); //add recipe to array 
                    console.log(result.data.data);
                } catch (error) {
                    console.error("Error fetching recipes:", error);
                }
            });
            
        };

        if (first || main || desert) {
            fetchData();
        }
    }, [first, main, desert]);

    // Render JSX based on recipeData here
    if (recipeIds.length > 1) { //if there is more than one recipe
            if (width<720) { //on mobile
                return ( 
                    <div className="recipesContainer">
                        {recipeData.map((currentData)=>{
                            <div className="inlineRecipeContainer">
                                <div className="imgTitleContainer">
                                    <img src={currentData.rec_img} alt={currentData.rec_name}/>
                                    <div className="procNameContainer">
                                        <div className="recipeNameContainer">
                                            <h2>{currentData.rec_name}</h2>
                                            <p>recipe description</p>
                                        </div>
                                        <div className="prepContainer" >
                                        <div className="ingredients">
                                            <h3 className="titleBtn">Ingredients:</h3>
                                            <ul className="hidden">
                                                {recipeData[0][ingredients].map((value, index)=><li key={index}>{value}</li>)}
                                            </ul>
                                        </div>
                                        <div className="procedure">
                                            <h3 className="titleBtn">Procedure:</h3>
                                            <p className="hiden">{currentData.procedure}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        })}

                    </div>
                )
            } else { //on pc 
                return (
                                <div className="recipesContainer">
                                    {recipeData.map((currentData, index)=>{
                                        <div className="inlineRecipeContainer">
                                            <div className="imgTitleContainer">
                                                <img src={currentData.rec_img} alt={currentData.rec_name}/>
                                                <div className="recipeNameContainer">
                                                    <h2>{currentData.rec_name}</h2>
                                                    {/* <p>{currentData.desccription}</p> */}
                                                    <p>recipe description</p>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                    
                            )
            }
        } else { // if there is only one recipe
            if (width<720) {
                        return (
                            <div className="recipesContainer">
                                <img src={recipeData[0].rec_img} alt={recipeData[0].rec_name} />
                                <h2>{recipeData[0].rec_name}</h2>
                                <p>recipe description</p>
                                <div>
                                    <h3>Ingredients:</h3>
                                    <ul>
                                        {recipeData[0][ingredients].map((value, index)=><li key={index}>{value}</li>)}
                                    </ul>
                                    <h3>Procedure:</h3>
                                    <p>{recipeData[0].procedure}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="recipesContainer">
                                <img src={recipeData[0].rec_img} alt={recipeData[0].rec_name} />
                                <h2>{recipeData[0].rec_name}</h2>
                                <p>recipe description</p>
                            </div>
                        )
                    }
        }
}

export default RecipeCard;



// import React, { useState, useEffect} from "react";
// import axios from "axios";
// import useWindowDimensions from "../utility/getWindowDimension";

// async function RecipeCard(props) {
//     const [currentRecipe, setCurrentRecipe] = useState(null);
//     const [currentIngredients, setCurrentIngredients] = useState(null);
//     const [requestData, setRequestData] = useState({});
//     // const [recipeData, setRecipeData] = useState([]);
//     let recipeData = []
//     const {width, height} = useWindowDimensions();

//     const {desert, main, first}= props.recipe

//     useEffect(() => {

//         const fetchData = async () => {
            
//             // const requestData = {}; changed to a hook 
//             if (first) setRequestData(prevData => ({ ...prevData, first: first }));
//             if (main) setRequestData(prevData => ({ ...prevData, main: main }));
//             if (desert) setRequestData(prevData => ({ ...prevData, desert: desert }));
    
//             try {
//                 const result = await axios.post("http://localhost:3000/getrecipe", requestData, { withCredentials: true });
//                 recipeData.push(result.rows[0]);
//                 console.log(result);
//             } catch (error) {
//                 console.error("Error fetching recipes:", error);
//             }
//         };
    
//         if (first || main || desert) {
//             fetchData();
//         }
//     }, []);

//     console.log(recipeData);
    
//     return recipeData;
    
// };

// export default RecipeCard;


    // if (recipeData.length > 1) { //if there is more than one recipe
    //     if (width<720) { //on mobile
            // return ( 
            //     <div className="recipesContainer">
            //         <div className="inlineRecipeContainer">
            //             <div className="imgTitleContainer">
            //                 <img src="./../../../public/resources/placeholder.jpg" alt=""/>
            //                 <div className="procNameContainer">
            //                     <div className="recipeNameContainer">
            //                         <h2>Recipe name</h2>
            //                         <p>recipe description</p>
            //                     </div>
            //                     <div className="prepContainer" >
            //                     <div className="ingredients">
            //                         <h3 className="titleBtn">Ingredients</h3>
            //                         <ul className="hiden">
            //                             <li>Item</li>
            //                         </ul>
            //                     </div>
            //                     <div className="procedure">
            //                         <h3 className="titleBtn">Procedure</h3>
            //                         <p className="hiden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus imperdiet. Metus dictum at tempor commodo ullamcorper. Ut eu sem integer vitae justo eget magna fermentum. Malesuada proin libero nunc consequat interdum varius sit. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Vestibulum morbi blandit cursus risus at ultrices. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Adipiscing vitae proin sagittis nisl rhoncus. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.</p>
            //                     </div>
            //                 </div>
            //             </div>
            //             </div>
                        
            //         </div>
            //     </div>
            // )
//             return <h1>will be updated</h1>
//         } else {
//             return (
//                             <div className="recipesContainer">
//                                 {recipeData.map((value, index)=>{
//                                     <div className="inlineRecipeContainer">
//                                         <div className="imgTitleContainer">
//                                             <img src={value.recipeImg} alt={value.name}/>
//                                             <div className="recipeNameContainer">
//                                                 <h2>{value.name? value.name: null}</h2>
//                                                 <p>{value.desccription? value.desccription:null}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 })}
//                             </div>
                                
//                         )
//         }
//     } else { // if there is only one recipe
//         if (width<720) {
//                     return (
//                         <div className="recipesContainer">
//                             <img src={recipeData[0].rec_img} alt={recipeData[0].name} />
//                             <h2>{recipeData[0].name}</h2>
//                             <p>recipe description</p>
//                             <div>
//                                 <h3>Ingredients:</h3>
//                                 <ul>
//                                     {recipeData[0][ingredients].map((value, index)=><li key={index}>{value}</li>)}
//                                 </ul>
//                                 <h3>Procedure:</h3>
//                                 <p>{recipeData[0].procedure}</p>
//                             </div>
//                         </div>
//                     )
//                 } else {
//                     return (
//                         <div className="recipesContainer">
//                             <img src={recipeData[0].rec_img} alt={recipeData[0].name} />
//                             <h2>{recipeData[0].name}</h2>
//                             <p>{recipeData[0].desccription}</p>
//                         </div>
//                     )
//                 }
//     }
    
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
    
        // if (props.type === "normall") {
        //     if (width<720) {
        //         return (
        //             <div className="recipesContainer">
        //                 <img src={currentRecipe.rec_img} alt={currentRecipe.name} />
        //                 <h2>{currentRecipe.name}</h2>
        //                 <p>recipe description</p>
        //                 <div>
        //                     <h3>Ingredients:</h3>
        //                     <ul>
        //                         {currentIngredients.map((value, index)=><li key={index}>{value}</li>)}
        //                     </ul>
        //                     <h3>Procedure:</h3>
        //                     <p>{currentRecipe.procedure}</p>
        //                 </div>
        //             </div>
        //         )
        //     } else {
        //         return (
        //             <div className="recipesContainer">
        //                 <img src={currentRecipe.rec_img} alt={currentRecipe.name} />
        //                 <h2>{currentRecipe.name}</h2>
        //                 <p>recipe description</p>
        //             </div>
        //         )
        //     }
        // }else{
            // if (width<720) {
            //     return (
            //         <div className="recipesContainer">
            //             <div className="inlineRecipeContainer">
            //                 <div className="imgTitleContainer">
            //                     <img src="./../../../public/resources/placeholder.jpg" alt=""/>
            //                     <div className="procNameContainer">
            //                         <div className="recipeNameContainer">
            //                             <h2>Recipe name</h2>
            //                             <p>recipe description</p>
            //                         </div>
            //                         <div className="prepContainer" >
            //                         <div className="ingredients">
            //                             <h3 className="titleBtn">Ingredients</h3>
            //                             <ul className="hiden">
            //                                 <li>Item</li>
            //                             </ul>
            //                         </div>
            //                         <div className="procedure">
            //                             <h3 className="titleBtn">Procedure</h3>
            //                             <p className="hiden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus imperdiet. Metus dictum at tempor commodo ullamcorper. Ut eu sem integer vitae justo eget magna fermentum. Malesuada proin libero nunc consequat interdum varius sit. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Vestibulum morbi blandit cursus risus at ultrices. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Adipiscing vitae proin sagittis nisl rhoncus. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.</p>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 </div>
                            
            //             </div>
            //         </div>
            //     )
        //     } else {
        //         return (
        //             <div className="recipesContainer">
        //                 <div className="inlineRecipeContainer">
        //                     <div className="imgTitleContainer">
        //                         <img src="./../../../public/resources/placeholder.jpg" alt=""/>
        //                         <div className="recipeNameContainer">
        //                             <h2>Recipe name</h2>
        //                             <p>recipe description</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     }
        // }
  
    




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
