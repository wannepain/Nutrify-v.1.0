import React, { useEffect } from "react";
import axios from "axios";

function RecipePopUp(props) {
    const recipeData = JSON.parse(props.recipeData)
    useEffect(()=>{
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    },[])
    
    function handleReturn(event) {
        document.body.style.overflow = "visible";
        props.setIsRecipeClicked(false)
    }
    function handleDone(event) {
        document.body.style.overflow = "visible";
        //think about how to store, when a recipe is done for a user
        props.setIsRecipeClicked(false)
    }

    let jsxToRender = (
        <div id="popUpMainDiv">
            <div id="popUpContainingDiv">
                <div id="popUpFirstDiv">
                    <div id="popUpReturnDiv">
                        <button type="button" onClick={handleReturn}><img src="./../../../public/resources/caret-left.svg" alt="Return" />Return</button>
                    </div>
                    <img src="./../../../public/resources/placeholder.jpg" alt={recipeData?.rec_name} />
                    <h1>{recipeData?.rec_name}</h1>
                    <p>{recipeData?.description}</p>
                    <button type="button" onClick={handleDone} id="popUpDoneBtn">Done</button>
                </div>
                <div id="popUpSecondDiv">
                    <div id="popUpUpperRow">
                        <h2>Ingredients</h2>
                        <ul>
                            {recipeData?.ingredients.map((value, index)=><li key={index}>{value}</li>)}
                        </ul>
                    </div>
                    <div id="popUpLowerRow">
                        <h2>Procedure</h2>
                        <p>{recipeData?.procedure}</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
    return jsxToRender;
}

export default RecipePopUp;