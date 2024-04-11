import React from "react";
import useWindowDimensions from "../utility/getWindowDimension";

function RecipeCard(props) {
    const {width, height} = useWindowDimensions();
    console.log(width);
    const recipes = props.recipesArray
        if (props.type === "normall") {
            if (width<720) {
                return (
                    <div className="recipesContainer">
                        <img src="./../../../public/resources/placeholder.jpg" alt="" />
                        <h2>Recipe name</h2>
                        <p>recipe description</p>
                        <div>
                            <h3>Ingredients:</h3>
                            <ul>
                                <li>Item</li>
                            </ul>
                            <h3>Procedure:</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus imperdiet. Metus dictum at tempor commodo ullamcorper. Ut eu sem integer vitae justo eget magna fermentum. Malesuada proin libero nunc consequat interdum varius sit. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Vestibulum morbi blandit cursus risus at ultrices. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Adipiscing vitae proin sagittis nisl rhoncus. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.</p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="recipesContainer">
                        <img src="./../../../public/resources/placeholder.jpg" alt="" />
                        <h2>Recipe name</h2>
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