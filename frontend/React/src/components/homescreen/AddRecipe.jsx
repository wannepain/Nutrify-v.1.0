import React, { useState } from "react";
import useWindowDimensions from "../utility/getWindowDimension";
import TextArea from "./add recipe/TextArea";

function AddRecipe(props) {
    const { width } = useWindowDimensions();
    const [addedImg, setAddedImg] = useState(null)
    const [isDone, setIsDone] = useState({"first": false, "second": false, "third": false, "fourth": false});
    const [currentStep, setCurrentStep] = useState("first")
    // const [selectedBtns, setSelectedBtns] = useState({diet: [], meal: [], course: null});
    const [diet, setDiet] = useState([]);
    const [meal, setMeal] = useState([]);
    const [course, setCourse] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
        //make an axios post handle errors 
    }

    function handleClick(event) {
        const gotClicked = event.currentTarget.getAttribute('data-value');
        event.preventDefault();
        if (gotClicked === "add_allergen" || gotClicked === "add_ingredients") {
            // Special code
        } else {
            // Code for all the buttons
            switch (gotClicked) {
                case "omnivorous":
                case "vegetarian":
                case "vegan":
                    setDiet(prevDiet => {
                        if (prevDiet.includes(gotClicked)) {
                            return prevDiet.filter(item => item !== gotClicked);
                        } else {
                            return [...prevDiet, gotClicked];
                        }
                    });
                    break;
    
                case "breakfast":
                case "lunch":
                case "dinner":
                case "snack":
                    console.log("inside meals");
                    setMeal(prevMeal => {
                        if (prevMeal.includes(gotClicked)) {
                            return prevMeal.filter(item => item !== gotClicked);
                        } else {
                            return [...prevMeal, gotClicked];
                        }
                    });
                    break;
    
                case "first":
                case "main":
                case "dessert":
                    console.log("inside course");
                    setCourse(prevCourse => {
                        if (prevCourse === gotClicked) {
                            console.log(course);
                            return null; // Reset the course if already selected
                        } else {
                            console.log(course);
                            return gotClicked;
                        }
                    });
                    break;
    
                default:
                    console.log("default");
                    break;
            }
        }
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

    const jsxToRender = {
        first:( //handle the file input
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
            <h2 className="addRecipeAboveBtnTitle">Select all fitting diets:</h2>
            <button 
                type="button" 
                data-value="omnivorous" 
                onClick={handleClick} 
                className={diet.includes("omnivorous")? "addRecipeSelectedBtn addRecipeDietBtn": "addRecipeDietBtn"}
            >
                Omnivorous
            </button>
            <button 
                type="button" 
                data-value="vegetarian" 
                onClick={handleClick} 
                className={diet.includes("vegetarian")? "addRecipeSelectedBtn addRecipeDietBtn": "addRecipeDietBtn"}
            >
                Vegetarian
            </button>
            <button 
                type="button" 
                data-value="vegan" 
                onClick={handleClick} 
                className={diet.includes("vegan")? "addRecipeSelectedBtn addRecipeDietBtn": "addRecipeDietBtn"}
            >
                Vegan
            </button>
        </div>

    ), third:(
        <div id="addRecipeContent">
            <h2>Add Ingredients (with the quantity):</h2>
            <div id="ingredientsInputDiv">
                <input type="text" name="ingredients_input" id="ingredients_input" placeholder="Ingredients"/>
                <button type="button" value="add" onClick={handleClick} data-value="add_ingredients">Add</button>
            </div>
            <div id="allergenContainerDiv">

            </div>
            <h2 className="addRecipeAboveBtnTitle">Select all the fitting meals:</h2>
            <button 
                type="button" 
                onClick={handleClick} 
                className={meal.includes("breakfast")? "addRecipeSelectedBtn addRecipeMealBtn": "addRecipeMealBtn"}
                data-value="breakfast"
            >
                Breakfast
            </button>
            <button 
            type="button" 
            onClick={handleClick} 
            className={meal.includes("lunch")? "addRecipeSelectedBtn addRecipeMealBtn": "addRecipeMealBtn"}
            data-value="lunch"
            >
                Lunch
            </button>
            <button 
            type="button" 
            onClick={handleClick} 
            className={meal.includes("dinner")? "addRecipeSelectedBtn addRecipeMealBtn": "addRecipeMealBtn"}
            data-value="dinner"
            >
                Dinner
            </button>
            <button 
            type="button" 
            onClick={handleClick} 
            className={meal.includes("snack")? "addRecipeSelectedBtn addRecipeMealBtn": "addRecipeMealBtn"} 
            data-value="snack"
            >
                Snack
            </button>
        </div>
    ), fourth:(
        <div id="addRecipeContent">
            <h2>Add Procedure:</h2>
            <textarea name="procedure" id="addRecipeProcedure" cols="30" rows="10"></textarea>
            <h2 className="addRecipeAboveBtnTitle">Select all the fitting courses:</h2>
            <button type="button" onClick={handleClick}className={course === "first"? "addRecipeSelectedBtn addRecipeCourseBtn": "addRecipeCourseBtn"} data-value="first">First Course</button>
            <button type="button" onClick={handleClick}className={course === "main"? "addRecipeSelectedBtn addRecipeCourseBtn": "addRecipeCourseBtn"} data-value="main">Main Course</button>
            <button type="button" onClick={handleClick}className={course === "dessert"? "addRecipeSelectedBtn addRecipeCourseBtn": "addRecipeCourseBtn"} data-value="dessert">Dessert</button>
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
                    {currentStep !== "fourth"? "Continue" : "Submit"}
                </button>
            }
          </div>
        </form>
      );
}

export default AddRecipe;

