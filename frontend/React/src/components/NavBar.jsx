import React from "react";  
// import "./../../public/NavBar.css";
function NavBar(props) {
    return (
<div>
    <div className="navbar hiden">
        <ul>
            <li><img src="./../../public/resources/nutrify.svg" alt="nutrify" className="nutrifyLogo"/></li>
            <li id="linkContainer"><a href="/premium/homepage" class="prevent-select">Home</a><a href="/premium/recipe" class="prevent-select">Add recipe</a></li>
        </ul>
    </div>
    <footer id="phoneNavBar">
        <ul>
            <li><button className="iconBtn" value="homescreen"><img src="./../../public/resources/home_icon.svg" alt="Home" /></button></li>
            <li><button className="iconBtn" value="recipe"><img src="./../../public/resources/add_recipe_icon.svg" alt="Add recipe" /></button></li>
        </ul>
    </footer>
</div>
)
}

export default NavBar;