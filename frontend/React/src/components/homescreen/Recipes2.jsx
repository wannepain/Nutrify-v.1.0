//second version of the Recipe.jsx
import React, { useEffect, useState } from "react";
import RecipeCard2 from "./RecipeCard2";

function Recipes2(props) {
    const [recipes, setRecipes] = useState(null);
    const [jsxToRender, setJsxToRender] = useState([]);

    useEffect(() => {
        if (props.ogRecipes && props.ogRecipes[0]) {
            setRecipes(props.ogRecipes[0]);
        }
    }, [props.ogRecipes]);

    useEffect(() => {
        if (recipes) {
            function handleLoad() {
              const jsxArray = [];
              Object.entries(recipes).map(([key, value], index) => {
                  if (key === "user_id") {
                      return null; // Skip this iteration
                  } else {
                      jsxArray.push(
                          <div key={index}>
                              <h1>{key}</h1>
                              {Object.keys(value).map((course, cIndex) => (
                                  <RecipeCard2 key={cIndex} course={course} />
                              ))}
                          </div>
                      );
                  }
              });
              setJsxToRender(jsxArray);
          }
          handleLoad();
          console.log(jsxToRender);
        }
    }, [recipes]);


    return (
        <div>
            <h1>hello</h1>
            {jsxToRender.map((value, index)=>{
              <p>{value}</p>
            })}
        </div>
    );
}

export default Recipes2;