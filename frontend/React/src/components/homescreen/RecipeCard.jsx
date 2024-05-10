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
                                <img src={currentData.rec_img} alt={currentData.rec_name} />
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
            console.log("current recipe meal",recipeData[0].rec_name,props.recipesMeal);
            jsxToRender = (
                <div>
                {props.recipesMeal === props.currentMeal? 
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
