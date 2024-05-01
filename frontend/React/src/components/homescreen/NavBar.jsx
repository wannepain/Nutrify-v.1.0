import React from "react";  
// import "./../../public/NavBar.css";
function NavBar(props) {
    
    function handleClick(event) {
        event.preventDefault();
        const gotClicked = event.currentTarget.getAttribute('data-value');
        console.log(gotClicked);
        if (gotClicked === "recipe") { // if the add recipe link got clicked
            console.log("recipe got clicked");
            props.setIsOnHomescreen(false);
        } else {
            props.setIsOnHomescreen(true);
            console.log("homescreen got clicked");
        }
    }

    return (
<div>
    <div className="navbar hiden">
        <ul>
            <li><img src="./../../public/resources/nutrify.svg" alt="nutrify" className="nutrifyLogo"/></li>
            <li id="linkContainer"><a href="/premium/homepage" className="prevent-select" onClick={handleClick} data-value="homescreen">Home</a><a href="/premium/recipe" className="prevent-select" onClick={handleClick} data-value="recipe">Add recipe</a></li>
        </ul>
    </div>
    <footer id="phoneNavBar">
        <ul>
            <li><button className="iconBtn" value="homescreen" onClick={handleClick} data-value="homescreen"><img src="./../../public/resources/home_icon.svg" alt="Home" /></button></li>
            <li><button className="iconBtn" value="recipe" onClick={handleClick} data-value="recipe"><img src="./../../public/resources/add_recipe_icon.svg" alt="Add recipe" /></button></li>
        </ul>
    </footer>
</div>
)
}

export default NavBar;