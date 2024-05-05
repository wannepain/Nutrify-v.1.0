import React, { useState } from "react";
import useWindowDimensions from "../utility/getWindowDimension";
import TextArea from "./add recipe/TextArea";

function AddRecipe(props) {
    const { width } = useWindowDimensions();
    const [addedImg, setAddedImg] = useState(null)
    const [isDone, setIsDone] = useState({"first": false, "second": false, "third": false, "fourth": false});
    const [currentStep, setCurrentStep] = useState("first")

    function handleSubmit(event) {
        event.preventDefault();
        //make an axios post handle errors 
    }

    function handleClick(event) {
        const gotClicked = event.currentTarget.getAttribute('data-value');
        event.preventDefault();
    }

    function handleChange(event) {
        const file = event.target.files[0]; // Get the first selected file
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageDataUrl = event.target.result; // Get the base64 encoded data URL
            setAddedImg(imageDataUrl); // Set the selected image as base64 encoded data
        };

        if (file) {
            reader.readAsDataURL(file); // Read the selected file as a data URL
        }
    }
    function handleReturn(event) {
        const currentPart = event.currentTarget.getAttribute("data-value");
        let prevPart;
        switch (currentPart) {
            case "second":
                prevPart = "first";
                break;
            case "third":
                prevPart = "second";
                break;
            case "fourth":
                prevPart = "third";
                break;

            default:
                prevPart = "first"
                break;
        }
        setCurrentStep(prevPart);
        setIsDone((prevDone) => ({
          ...prevDone,
          [currentPart]: false,
        }));
      }
      
    function handleNext(event) {
      const currentPart = event.currentTarget.getAttribute("data-value");
      let nextPart;
      switch (currentPart) {
        case "first":
            nextPart = "second";
            break;
        case "second":
            nextPart = "third";
            break;
        case "third":
            nextPart = "fourth";
            break;

        default:
            nextPart = "second"
            break;
      }
      setCurrentStep(nextPart);
      setIsDone((prevDone) => ({
        ...prevDone,
        [currentPart]: true,
      }));
    }      

    const jsxToRender = {first:( //handle the file input
        <div id="addRecipeContent">
            <div id="imgInputDiv">
                <img src={addedImg !== null ? addedImg : "./../../../public/resources/add_image.svg"} alt="recipe image" />
                <input type="file" name="rec_img" id="rec_img" onChange={handleChange}/>
            </div>
            <input type="text" name="rec_name" placeholder="Recipe Name"/>
            <input type="text" name="rec_description" placeholder="Recipe Description"/>
        </div>
    ), second:(
        <div id="addRecipeContent">
            <div id="allergenInputDiv">
                <input type="text" name="allergen_input" id="allergen_input" />
                <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
            </div>
            <div id="allergenContainerDiv">

            </div>

            <input type="number" name="cals" id="" />
            <input type="number" name="prots" id="" />
            <input type="number" name="fats" id="" />
            <input type="number" name="carbs" id="" />
            <button type="button" value="omnivorous" onClick={handleClick}>Omnivorous</button>
            <button type="button" value="vegetarian" onClick={handleClick}>Vegetarian</button>
            <button type="button" value="vegan" onClick={handleClick}>Vegan</button>
        </div>

    ), third:(
        <div id="addRecipeContent">
            <TextArea labelText="Ingredients" name="ingredients"/>
            <button type="button" onClick={handleClick}>Breakfast</button>
            <button type="button" onClick={handleClick}>Lunch</button>
            <button type="button" onClick={handleClick}>Dinner</button>
            <button type="button" onClick={handleClick}>Snack</button>
        </div>
    ), fourth:(
        <div id="addRecipeContent">
            <TextArea labelText="Procedure" name="procedure"/>
            <button type="button">First Course</button>
            <button type="button">Main Course</button>
            <button type="button">Desser</button>
            <button type="submit">Submit</button>
        </div>
    )}
    
    return (
        <form action="" id="formAddRecipe" onSubmit={handleSubmit}>
          <div id="addRecipeInner">
            <div id="addRecipeNav">
              {/* "Return" button */}
              {
                <a data-value={currentStep} onClick={handleReturn} className={currentStep === "first" && "addRecipeHidden"}>
                  <img src="" alt="" />Return
                </a>
              }
              {/* "Next" button */}
              {
                <a data-value={currentStep} onClick={handleNext}  className={currentStep === "fourth" && "addRecipeHidden"}>
                  <img src="" alt="" />Next
                </a>
              }
            </div>
            <div id="addRecipeContent">
                {/* Render the current step */}
                {jsxToRender[currentStep]}
            </div>
          </div>
        </form>
      );
}

export default AddRecipe;



// if (!isDone.first) {
        //     jsxToRender = (
        //         <form action="" id="formAddRecipe" onSubmit={handleSubmit}>
        //             <div id="addRecipeNav">
        //                 <a onClick={handleReturn} data-value="first" id="addRecipeHidden"><img src="" alt="" />Return</a>
        //                 <a onClick={handleNext} data-value="first"><img src="" alt="" />Next</a>
        //             </div>
        //             <div  id="addRecipeContent">
        //                 <div id="imgInputDiv">
        //                     <img src={addedImg? addedImg : "./../../../public/resources/placeholder.jpg"} alt="recipe image" />
        //                     <input type="file" name="rec_img" id="rec_img"/>
        //                 </div>
        //                 <input type="text" name="rec_name" />
        //                 <input type="text" name="rec_description" />
        //             </div>
        //         </form>
        //     )
        // } else if(!isDone.second){
        //     jsxToRender = (
        //         <form action="" id="formAddRecipe" onSubmit={handleSubmit}>
        //             <div id="addRecipeNav">
        //                 <a onClick={handleReturn} data-value="second"><img src="" alt="" />Return</a>
        //                 <a onClick={handleNext} data-value="second"><img src="" alt="" />Next</a>
        //             </div>
        //             <div  id="addRecipeContent">
        //                 <div id="allergenInputDiv">
        //                     <input type="text" name="allergen_input" id="allergen_input" />
        //                     <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
        //                 </div>
        //                 <div id="allergenContainerDiv">

        //                 </div>
        //                 <input type="number" name="cals" id="" />
        //                 <input type="number" name="prots" id="" />
        //                 <input type="number" name="fats" id="" />
        //                 <input type="number" name="carbs" id="" />

        //                 <button type="button" value="omnivorous" onClick={handleClick}>Omnivorous</button>
        //                 <button type="button" value="vegetarian" onClick={handleClick}>Vegetarian</button>
        //                 <button type="button" value="vegan" onClick={handleClick}>Vegan</button>
        //             </div>
        //         </form>
        //     )
        // } else if(!isDone.third){
        //     jsxToRender = (
        //         <form action="" id="formAddRecipe" onSubmit={handleSubmit}>
        //             <div id="addRecipeNav">
        //                 <a onClick={handleReturn} data-value="third"><img src="" alt="" />Return</a>
        //                 <a onClick={handleNext} data-value="third"><img src="" alt="" />Next</a>
        //             </div>
        //             <div id="addRecipeContent">
        //                 <TextArea labelText="Ingredients" name="ingredients"/>
        //                 <button type="button" onClick={handleClick}>Breakfast</button>
        //                 <button type="button" onClick={handleClick}>Lunch</button>
        //                 <button type="button" onClick={handleClick}>Dinner</button>
        //                 <button type="button" onClick={handleClick}>Snack</button>
        //             </div>
        //         </form>
        //     )
        // } else if(!isDone.fourth){
        //     jsxToRender = (
                
        //     )
        // }



// if (width > 720 ) { // on pc 
    //     jsxToRender = (
    //         <form onSubmit={handleSubmit}>
    //             <div id="parentRecipeDiv">
    //                 <div id="firstColumnDiv">
    //                     <div id="imgInputDiv">
    //                         <img src={addedImg? addedImg : "./../../../public/resources/placeholder.jpg"} alt="recipe image" />
    //                         <input type="file" name="rec_img" id="rec_img"/>
    //                     </div>
    //                     <label htmlFor="rec_name">Recipe Name</label>
    //                     <input type="text" name="rec_name" id="rec_name" />

    //                     <label htmlFor="rec_description">Recipe Description</label>
    //                     <textarea name="rec_description" id="rec_description" cols="30" rows="5"></textarea>

    //                     <button type="submit" value="submit">Submit</button>
    //                 </div>

    //                 <div id="secondColumnDiv">
    //                     <div id="allergenInputDiv">
    //                         <input type="text" name="allergen_input" id="allergen_input" />
    //                         <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
    //                     </div>
    //                     <div id="allergenDiv">

    //                     </div>
    //                     <div className="sideBySideMacro">
    //                         <div className="column marginRight">
    //                             <label htmlFor="cals_input">Calories</label>
    //                             <input type="number" name="cals" id="cals_input" />
    //                         </div>
                            
    //                         <div className="column">
    //                             <label htmlFor="prots_input">Proteins</label>
    //                             <input type="number" name="prots" id="prots_input" />
    //                         </div>
    //                     </div>
                        
    //                     <div className="sideBySideMacro">
    //                         <div className="column marginRight">
    //                             <label htmlFor="fats_input">Fats</label>
    //                             <input type="number" name="fats" id="fats_input" />
    //                         </div>
                            
    //                         <div className="column">
    //                             <label htmlFor="carbs_input">Carbohydrates</label>
    //                             <input type="number" name="carbs" id="carbs_input" />
    //                         </div>
    //                     </div>
    //                     <div id="macroComment">
    //                         <p>Macronutriens for the whole meal</p>
    //                     </div>
    //                     <div id="dietDiv">
    //                         <button type="button" value="omnivorous" onClick={handleClick} data-value="diet">Omnivorous</button>
    //                         <button type="button" value="vegetarian" onClick={handleClick} data-value="diet">Vegetarian</button>
    //                         <button type="button" value="vegan" onClick={handleClick} data-value="diet">Vegan</button>
    //                     </div>
    //                 </div>

    //                 <div id="thirdColumnDiv">
    //                     <TextArea labelText="Ingredients" name="ingredients"/>
    //                     <div id="mealSmallDiv">
    //                         <button type="button" value="breakfast" onClick={handleClick} data-value="meal">Breakfast</button>
    //                         <button type="button" value="lunch" onClick={handleClick} data-value="meal">Lunch</button>
    //                         <button type="button" value="dinner" onClick={handleClick} data-value="meal">Dinner</button>
    //                         <button type="button" value="snack" onClick={handleClick} data-value="meal">Snack</button>
    //                     </div>
    //                 </div>

    //                 <div id="fourthColumnDiv">
    //                     <TextArea labelText="Procedure" name="procedure"/>
    //                     <div id="courseSmallDiv">
    //                         <button type="button" value="first" onClick={handleClick} data-value="course">First course</button>
    //                         <button type="button" value="main" onClick={handleClick} data-value="course">Main course</button>
    //                         <button type="button" value="dessert" onClick={handleClick} data-value="course">Dessert</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </form>
    //     )
    // } else { // on mobile
    //     jsxToRender = (
    //         <form action="">
    //             <div>
    //                 <div id="firstHalfDiv">
    //                     <div id="imgInputDiv">
    //                         <img src={addedImg? addedImg : "./../../../public/resources/placeholder.jpg"} alt="recipe image" />
    //                         <input type="file" name="rec_img" id="rec_img" className="hidden"/>
    //                     </div>
    //                     <div id="allergenSideBySideDiv">
    //                         <input type="text" name="allergens" id="allergen_input" />
    //                         <button type="button"  onClick={handleClick} data-value="add_allergen"><img src="./../../public/resources/add_recipe_icon.svg" alt="Add"/></button>
    //                     </div>

    //                     <textarea name="ingredients" id="ingredient_input" cols="30" rows="10"></textarea>
                        
    //                     <label htmlFor="cals_input">Calories</label>
    //                     <input type="number" name="cals" id="cals_input" />
    //                     <label htmlFor="prots_input">Proteins</label>
    //                     <input type="number" name="prots" id="prots_input" />
    //                     <label htmlFor="fats_input">Fats</label>
    //                     <input type="number" name="fats" id="fats_input" />
    //                     <label htmlFor="carbs_input">Carbs</label>
    //                     <input type="number" name="carbs" id="carbs_input" />

    //                     <button type="button" value="breakfast" onClick={handleClick} data-value="meal">Breakfast</button>
    //                     <button type="button" value="dinner" onClick={handleClick} data-value="meal">Dinner</button>
    //                 </div>
    //                 <div id="secondHalfDiv">
    //                     <label htmlFor="rec_name">Recipe name</label>
    //                     <input type="text" name="rec_name" id="rec_name" />

    //                     <label htmlFor="rec_description">Description</label>
    //                     <textarea name="description" id="rec_description" cols="30" rows="5"></textarea>

    //                     <div>
    //                         {/* add the allergens here dinamically */}
    //                     </div>

    //                     <label htmlFor="rec_description">Procedure</label>
    //                     <textarea name="procedure" id="rec_procedure" cols="30" rows="10"></textarea>

    //                     <button type="button" value="omnivorous" onClick={handleClick} data-value="diet">Omnivorous</button>
    //                     <button type="button" value="vegetarian" onClick={handleClick} data-value="diet">Vegetarian</button>
    //                     <button type="button" value="vegan" onClick={handleClick} data-value="diet">Vegan</button>

    //                     <button type="button" value="lunch" onClick={handleClick} data-value="meal">Lunch</button>
    //                     <button type="button" value="snack" onClick={handleClick} data-value="meal">Snack</button>
    //                 </div>
    //                 <button type="button" value="first" onClick={handleClick} data-value="course">First</button>
    //                 <button type="button" value="main" onClick={handleClick} data-value="course">Main</button>
    //                 <button type="button" value="desert" onClick={handleClick} data-value="course">Desert</button>

    //                 <button type="submit" value="submit">Submit</button>
    //             </div>
    //         </form>
            
    //     )
    // }