import React, { useState } from "react";
import useWindowDimensions from "../utility/getWindowDimension";
import TextArea from "./add recipe/TextArea";

function AddRecipe(props) {
    const { width } = useWindowDimensions();
    const [addedImg, setAddedImg] = useState(null)
    const [isDone, setIsDone] = useState({"first": false, "second": false, "third": false, "fourth": false});
    const [currentStep, setCurrentStep] = useState("first")
    const [showFileInput, setShowFileInput] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();
        //make an axios post handle errors 
    }

    function handleClick(event) {
        const gotClicked = event.currentTarget.getAttribute('data-value');
        event.preventDefault();
    }
    function handleShowInput(event) {
        event.preventDefault();
        document.getElementById("rec_img").click();
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
                <img 
                    src={addedImg !== null ? addedImg : "./../../../public/resources/add_image.svg"} 
                    alt="recipe image" onClick={handleShowInput}
                    id={addedImg !== null? null : "svgAddImage"}
                />
                {/* <button type="button" id="showFileInput" onClick={handleShowInput}></button> */}
                <input type="file" name="rec_img" id="rec_img" onChange={handleChange}/>
            </div>
            <input type="text" name="rec_name" placeholder="Recipe Name"/>
            <input type="text" name="rec_description" placeholder="Recipe Description"/>
            <p>The description should be one short sentance, like "A delicious Pizza, just like from Italy"</p>
        </div>
    ), second:(
        <div id="addRecipeContent">
            <h2>Add allergens:</h2>
            <div id="allergenInputDiv">
                <input type="text" name="allergen_input" id="allergen_input" placeholder="Allergens"/>
                <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
            </div>
            <div id="allergenContainerDiv">

            </div>
            <h2>Add macronutrients:</h2>
            <div id="addRecipeFirstRow">
                <input type="number" name="cals" placeholder="Calories"/>
                <input type="number" name="prots" placeholder="Proteins" />
            </div>
            <div id="addRecipeSecondRow">
                <input type="number" name="fats" placeholder="Fats" />
                <input type="number" name="carbs" placeholder="Carbohydrates" />
            </div>
            <h2 className="addRecipeAboveBtnTitle">Add diets:</h2>
            <button type="button" value="omnivorous" onClick={handleClick} className="addRecipeDietBtn">Omnivorous</button>
            <button type="button" value="vegetarian" onClick={handleClick} className="addRecipeDietBtn">Vegetarian</button>
            <button type="button" value="vegan" onClick={handleClick} className="addRecipeDietBtn">Vegan</button>
        </div>

    ), third:(
        <div id="addRecipeContent">
            <h2>Add Ingredients (with the quantity):</h2>
            <div id="ingredientsInputDiv">
                <input type="text" name="ingredients_input" id="ingredients_input" />
                <button type="button" value="add" onClick={handleClick} data-value="add_ingredients">Add</button>
            </div>
            <div id="allergenContainerDiv">

            </div>
            <h2 className="addRecipeAboveBtnTitle">Select all the fitting meals:</h2>
            <button type="button" onClick={handleClick} className="addRecipeMealBtn">Breakfast</button>
            <button type="button" onClick={handleClick} className="addRecipeMealBtn">Lunch</button>
            <button type="button" onClick={handleClick} className="addRecipeMealBtn">Dinner</button>
            <button type="button" onClick={handleClick} className="addRecipeMealBtn">Snack</button>
        </div>
    ), fourth:(
        <div id="addRecipeContent">
            <h2>Add Procedure:</h2>
            <textarea name="procedure" id="addRecipeProcedure" cols="30" rows="10"></textarea>
            <h2 className="addRecipeAboveBtnTitle">Select all the fitting courses:</h2>
            <button type="button" className="addRecipeCourseBtn">First Course</button>
            <button type="button" className="addRecipeCourseBtn">Main Course</button>
            <button type="button" className="addRecipeCourseBtn">Desser</button>
            <button type="submit" className="addRecipeCourseBtn">Submit</button>
        </div>
    )}
    
    return (
        <form action="" id="formAddRecipe" onSubmit={handleSubmit}>
          <div id="addRecipeInner">
            <div id="addRecipeNav">
              {/* "Return" button */}
              {
                <a data-value={currentStep} onClick={handleReturn} className={currentStep === "first" && "addRecipeHidden"}>
                  <img src="./../../public/resources/caret-left.svg" alt="" />Return
                </a>
              }
            </div>
            {/* Render the current step */}
            {jsxToRender[currentStep]}
            {/* "Next" button */}
            {
                <button type="button" data-value={currentStep} onClick={currentStep !== "fourth"? handleNext : handleSubmit} id="continueBtn">
                    <img src="" alt="" /> {currentStep !== "fourth"? "Continue" : "Submit"}
                </button>
            }
          </div>
        </form>
      );
}

export default AddRecipe;

