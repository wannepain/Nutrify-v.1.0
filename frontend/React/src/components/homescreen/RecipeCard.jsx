import React, { useState, useEffect } from "react";
import axios from "axios";
import useWindowDimensions from "../utility/getWindowDimension";

function RecipeCard(props) {
    const [recipeData, setRecipeData] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { desert, main, first } = props.recipe;
    const { width } = useWindowDimensions();

    useEffect(() => {
        const fetchData = async () => {
            const recipeIds = [];
            if (first != null) recipeIds.push(first);
            if (main != null) recipeIds.push(main);
            if (desert != null) recipeIds.push(desert);

            try {
                const responses = await Promise.all(
                    recipeIds.map(async (currentId) => {
                        const result = await axios.post("http://localhost:3000/getrecipe", { id: currentId });
                        return result.data.data;
                    })
                );
                setRecipeData(responses);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        if (first || main || desert) {
            fetchData();
        }
    }, [first, main, desert]);

    useEffect(() => {
        setIsSmallScreen(width < 720);
    }, [width]);

    function handleClick(event) {
        const dataOfClicked = event.currentTarget.getAttribute('data-value');
        props.setIsRecipeClicked(dataOfClicked);
    }

    let jsxToRender;
    if (recipeData.length > 1) { // there is more than one recipe
        if (isSmallScreen) {
            jsxToRender = (
                <div className="recipesContainer">
                    {recipeData.map((currentData,index)=>(
                        <div className="inlineRecipeContainer" key={index}>
                            <div className="imgTitleContainer">
                                <img src={currentData.rec_img} alt={currentData.rec_name}/>
                                <div className="procNameContainer">
                                    <div className="recipeNameContainer">
                                        <h2>{currentData.rec_name}</h2>
                                        <p>{currentData.description}</p>
                                    </div>
                                    <div className="prepContainer" >
                                        <div className="ingredients">
                                            <h3 className="titleBtn">Ingredients:</h3>
                                            <ul className="hidden">
                                                {currentData.ingredients.map((value, index)=><li key={index}>{value}</li>)}
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
                    ))}
                </div>
            );
        } else { // the card must be clickable, on click the whole recipe should appear over the rest of the page
            jsxToRender = (
                <div className="recipesContainer"> 
                    {recipeData.map((currentData, index)=>(
                        <div className="inlineRecipeContainer" key={index}>
                            <div className="imgTitleContainer">
                                <img src={currentData.rec_img} alt={currentData.rec_name}/>
                                <div className="recipeNameContainer">
                                    <h2 onClick={handleClick} data-value={currentData}>{currentData.rec_name}</h2>
                                    <p>{currentData.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    } else { // there is only one recipe
        if (isSmallScreen) {
            console.log(recipeData[0]?.meal, props.currentMeal);
            jsxToRender = (
                <div>
                {recipeData[0]?.meal === props.currentMeal? 
                    <div className="recipesContainer" data-value={recipeData[0]?.meal}>
                    {/* <img src={recipeData[0]?.rec_img ? recipeData[0].rec_img : "./../../../public/resources/placeholder.jpg"} alt={recipeData[0]?.rec_name} /> */}
                    <img src="./../../../public/resources/placeholder.jpg" alt="" />
                    <h2>{recipeData[0]?.rec_name}</h2>
                    <p>{recipeData[0]?.description}</p>
                    <div>
                        <h3>Ingredients:</h3>
                        <ul>
                            {recipeData[0]?.ingredients.map((value, index)=><li key={index}>{value}</li>)}
                        </ul>
                        <h3>Procedure:</h3>
                        <p>{recipeData[0]?.procedure}</p>
                    </div>
                </div>: null}
            </div>
            );
        } else {
            // console.log(recipeData[0]);
            jsxToRender = ( // the card must be clickable, on click the whole recipe should appear over the rest of the page
                <div className="recipesContainer">
                    <img src={recipeData[0]?.rec_img ? recipeData[0].rec_img : "./../../../public/resources/placeholder.jpg"} alt={recipeData[0]?.rec_name} />
                    <h2  onClick={handleClick} data-value={JSON.stringify(recipeData[0])}>{recipeData[0]?.rec_name}</h2>
                    <p>{recipeData[0]?.description}</p>
                </div>
            );
        }
    }

    return jsxToRender;
}

export default RecipeCard;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useWindowDimensions from "../utility/getWindowDimension";

// function RecipeCard(props) {
//     const [currentRecipe, setCurrentRecipe] = useState(null);
//     const [currentIngredients, setCurrentIngredients] = useState(null);
//     // const [requestData, setRequestData] = useState({});
//     const recipeIds = [];
//     const recipeData =[];
//     // const [recipeData, setRecipeData] = useState([]);
//     const { desert, main, first } = props.recipe;
//     const { width, height } = useWindowDimensions();

//     useEffect(() => {
//         const fetchData = async () => {
//             // let requestData = {};
//             if (first != null) recipeIds.push(first);
//             if (main != null) recipeIds.push(main);
//             if (desert != null) recipeIds.push(desert);

//             recipeIds.map(async (currentId,index)=>{
//                 try {
//                     console.log(currentId);
//                     const result = await axios.post("http://localhost:3000/getrecipe", {id: currentId});
//                     recipeData.push(result.data.data); //add recipe to array 
//                     console.log(result.data.data);
//                 } catch (error) {
//                     console.error("Error fetching recipes:", error);
//                 }
//             });
            
//         };

//         if (first || main || desert) {
//             fetchData();
//             console.log(renderJSX());
//         }
//     }, [first, main, desert, renderJSX]);
//     function renderJSX() {
//         if (recipeIds.length > 1) { //if there is more than one recipe
//             if (width<720) { //on mobile
//                 return ( 
//                     <div className="recipesContainer">
//                         {recipeData.map((currentData)=>{
//                             <div className="inlineRecipeContainer">
//                                 <div className="imgTitleContainer">
//                                     <img src={currentData.rec_img} alt={currentData.rec_name}/>
//                                     <div className="procNameContainer">
//                                         <div className="recipeNameContainer">
//                                             <h2>{currentData.rec_name}</h2>
//                                             <p>recipe description</p>
//                                         </div>
//                                         <div className="prepContainer" >
//                                         <div className="ingredients">
//                                             <h3 className="titleBtn">Ingredients:</h3>
//                                             <ul className="hidden">
//                                                 {recipeData[0][ingredients].map((value, index)=><li key={index}>{value}</li>)}
//                                             </ul>
//                                         </div>
//                                         <div className="procedure">
//                                             <h3 className="titleBtn">Procedure:</h3>
//                                             <p className="hiden">{currentData.procedure}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 </div>
//                             </div>
//                         })}

//                     </div>
//                 )
//             } else { //on pc 
//                 return (
//                                 <div className="recipesContainer">
//                                     {recipeData.map((currentData, index)=>{
//                                         <div className="inlineRecipeContainer">
//                                             <div className="imgTitleContainer">
//                                                 <img src={currentData.rec_img} alt={currentData.rec_name}/>
//                                                 <div className="recipeNameContainer">
//                                                     <h2>{currentData.rec_name}</h2>
//                                                     {/* <p>{currentData.desccription}</p> */}
//                                                     <p>recipe description</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     })}
//                                 </div>
                                    
//                             )
//             }
//         } else { // if there is only one recipe
//             if (width<720) {
//                         return (
//                             <div className="recipesContainer">
//                                 <img src={recipeData[0].rec_img != undefined? recipeData[0].rec_img : "./../../../public/resources/placeholder.jpg"} alt={recipeData[0].rec_name} />
//                                 <h2>{recipeData[0].rec_name}</h2>
//                                 <p>recipe description</p>
//                                 <div>
//                                     <h3>Ingredients:</h3>
//                                     <ul>
//                                         {recipeData[0][ingredients].map((value, index)=><li key={index}>{value}</li>)}
//                                     </ul>
//                                     <h3>Procedure:</h3>
//                                     <p>{recipeData[0].procedure}</p>
//                                 </div>
//                             </div>
//                         )
//                     } else {
//                         return (
//                             <div className="recipesContainer">
//                                 <img src={recipeData[0].rec_img != undefined? recipeData[0].rec_img : "./../../../public/resources/placeholder.jpg"} alt={recipeData[0].rec_name} />
//                                 <h2>{recipeData[0].rec_name}</h2>
//                                 <p>recipe description</p>
//                             </div>
//                         )
//                     }
//         }
//     }

//     return <h1>not yet finished</h1>
// }

// export default RecipeCard;