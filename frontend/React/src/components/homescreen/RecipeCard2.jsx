// improved version of the RecipeCard 

import React from "react";

function RecipeCard2(props) {
    return(
        <div>
            <div>
                {/* to change recipes in the day */}
                <button type="button">Breakfast</button>
                <button type="button">Lunch</button>
                <button type="button">Dinner</button>
            </div>

            <div>
                {/* Rec_img, Name, Autor and description div */}
                <img src="" alt="" />
                <h1>Recipe name</h1>
                <h3>Author</h3>
                <h2>description</h2>
            </div>

            <div>
                {/* ingredients div */}
                <h2>Ingredients</h2>
                <ul>
                    <li>Ingredient</li>
                </ul>
            </div>

            <div>
                {/* procedure div */}
                <h2>Procedure</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie ac feugiat. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Quam elementum pulvinar etiam non quam lacus suspendisse. Libero nunc consequat interdum varius. Mi bibendum neque egestas congue quisque. Maecenas pharetra convallis posuere morbi leo. Vitae elementum curabitur vitae nunc. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Venenatis lectus magna fringilla urna porttitor rhoncus. Morbi tristique senectus et netus et malesuada fames. At in tellus integer feugiat scelerisque varius morbi enim. Mi sit amet mauris commodo quis imperdiet. Ut placerat orci nulla pellentesque dignissim enim. Faucibus in ornare quam viverra orci sagittis eu volutpat. Blandit volutpat maecenas volutpat blandit. Nisl nisi scelerisque eu ultrices.</p>
            </div>  
        </div>
    )
}

export default RecipeCard2;