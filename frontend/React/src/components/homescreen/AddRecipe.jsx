import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function AddRecipe(props) {
    const [error, setError] = useState(null);
    const [addedImg, setAddedImg] = useState(null)
    const [isDone, setIsDone] = useState({"first": false, "second": false, "third": false, "fourth": false});
    const [currentStep, setCurrentStep] = useState("first");
    const [recipeInfo, setRecipeInfo] = useState({
        "rec_name": "",
        "rec_description": "",
        "cals": "",
        "prots": "",
        "fats": "",
        "carbs": "",
        "procedure": "",
        "allergies": [] // Initialize as an empty array
    });
    // const [selectedBtns, setSelectedBtns] = useState({diet: [], meal: [], course: null});
    const [diet, setDiet] = useState([]);
    const [meal, setMeal] = useState([]);
    const [course, setCourse] = useState(null);
    //testing allergen inputs:
    const [specialInputs, setSpecialInputs] = useState({"allergen_input":"", "ingredients_input":""});
    const [specialValues, setSpecialValues] = useState({"allergen_input":[], "ingredients_input":[]});
    const [username, setUsername] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem('jwtToken'); //gets token from local storage
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        async function getUsername() {
            try {
                const result = await axios.post("http://localhost:3000/getUsername", {id: payload.id});
                if (result.data.username) {
                    setUsername(result.data.username);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUsername();
    },[])

    function handleRemove(event) {
        console.log(event.currentTarget);
        const gotClicked = event.currentTarget.getAttribute('data-value');
        const elementToRemove = event.currentTarget.value;
        if (gotClicked === "allergen_btn") { //allergen
            setSpecialValues(prevValue => ({
                ...prevValue,
                allergen_input: prevValue.allergen_input.filter(allergen => allergen !== elementToRemove)
            }));
        } else { //ingredient
            setSpecialValues(prevValue => ({
                ...prevValue,
                ingredients_input: prevValue.ingredients_input.filter(ingredient => ingredient !== elementToRemove)
            }));
        }
        
    };

    async function handleSubmit(event) { 
        // {
        // "username": "example_user",
        // "rec_name": "Spaghetti Carbonara",
        // "rec_img": "https://example.com/spaghetti_carbonara.jpg",
        // "ingredients": ["spaghetti", "bacon", "eggs", "parmesan cheese", "black pepper"],
        // "procedure": "1. Cook spaghetti according to package instructions. 2. Fry bacon until crispy. 3. Beat eggs and mix with grated parmesan cheese. 4.   Toss cooked spaghetti with bacon and egg mixture. 5. Season with black pepper. 6. Serve hot.",
        // "allergies": ["None"],
        // "diet": ["None"],
        // "calories": 600,
        // "proteins": 25,
        // "carbs": 70,
        // "fats": 28
        // "meal": "lunch" or "breakfast" or "dinner"
        // "course": "first" or "main" or "desert"
        // "description": recipe description, the shorter, the better
    //   }

        console.log("sumbit prevented"); 
        event.preventDefault();
        //make an axios post handle errors 
        console.log(username);
        try {
            const result = await axios.post("http://localhost:3000/add/recipe", [{
                "username": username,
                "rec_name": recipeInfo.rec_name,
                "rec_img": addedImg,
                "ingredients": specialValues.ingredients_input,
                "procedure": recipeInfo.procedure,
                "allergies": specialValues.allergen_input,
                "diet": diet,
                "calories": recipeInfo.cals,
                "proteins": recipeInfo.prots,
                "carbs": recipeInfo.carbs,
                "fats": recipeInfo.fats,
                "meal": meal,
                "course": course,
                "description": recipeInfo.rec_description
            }])
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    function handleClick(event) {
        const gotClicked = event.currentTarget.getAttribute('data-value');
        event.preventDefault();
        if (gotClicked === "add_allergen" || gotClicked === "add_ingredients") {
            // Special code
            if (gotClicked === "add_allergen") {
                if (specialValues["allergen_input"].includes(specialInputs.allergen_input)) {// check if already added
                    //write error message to the user
                    setError("Allergen already added");
                    setSpecialInputs((prevInput)=>(
                        {
                            ...prevInput,
                            "allergen_input": ""
                        }
                    ));
                } else if (isValueInDatalist(specialInputs.allergen_input, "allergens_list")){
                    setSpecialValues((prevValue)=>(
                        {
                            ...prevValue,
                            allergen_input: [...prevValue.allergen_input, specialInputs.allergen_input]
                        }
                    ));
                    setSpecialInputs((prevInput)=>(
                        {
                            ...prevInput,
                            "allergen_input": ""
                        }
                    ));
                } else{ //allergen not found in datalist
                    setError("Invalid Allergen")
                    console.log("not in datalist");
                }
            } else {
                // Handle adding ingredients if needed
                if (specialValues["ingredients_input"].includes(specialInputs.ingredients_input)) {// check if already added
                    setError("Ingredient already added");
                    setSpecialInputs((prevInput)=>(
                        {
                            ...prevInput,
                            "ingredients_input": ""
                        }
                    ));
                } else{
                    setSpecialValues((prevValue)=>(
                        {
                            ...prevValue,
                            ingredients_input: [...prevValue.ingredients_input, specialInputs.ingredients_input]
                        }
                    ));
                    setSpecialInputs((prevInput)=>(
                        {
                            ...prevInput,
                            "ingredients_input": ""
                        }
                    ));
                }
            }
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
    
    function handleInputChange(event) {
        const gotChanged = event.currentTarget.getAttribute("name");
        const valueOfChange = event.currentTarget.value;

        if (gotChanged === "allergen_input" || gotChanged === "ingredients_input") { // works for both cases 
            setSpecialInputs((prevInput)=>(
                {
                    ...prevInput,
                    [gotChanged]:valueOfChange.toLowerCase()
                }
            ));
        } else {
            //other inputs
            setRecipeInfo((prevInfo)=>(
                {
                    ...prevInfo,
                    [gotChanged]:valueOfChange
                }
            ));
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
                if (!recipeInfo.rec_name || !recipeInfo.rec_description || !addedImg) {
                    setError("Please fill in all required fields.");
                    return; // Exit early if fields are missing
                }
                nextPart = "second";
                setError(null);
                break;
    
            case "second":
                if (!specialValues["allergen_input"].length || !recipeInfo.cals || !diet.length) {
                    setError("Please fill in all required fields.");
                    return; // Exit early if fields are missing
                }
                nextPart = "third";
                setError(null);
                break;
    
            case "third":
                if (!specialValues["ingredients_input"].length || !meal.length) {
                    setError("Please fill in all required fields.");
                    return; // Exit early if fields are missing
                }
                nextPart = "fourth";
                setError(null);
                break;
    
            default:
                nextPart = "second";
                break;
        }
    
        setCurrentStep(nextPart);
        setIsDone(prevDone => ({
            ...prevDone,
            [currentPart]: true,
        }));
    }
    

    //utility functions:
    function isValueInDatalist(value, datalistId) {
        const datalist = document.getElementById(datalistId);
        const options = datalist.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                return true; // Value found in datalist
            }
        }
        return false; // Value not found in datalist
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
            <input type="text" name="rec_name" placeholder="Recipe Name" onChange={handleInputChange} value={recipeInfo.rec_name}/>
            <input type="text" name="rec_description" placeholder="Recipe Description"  onChange={handleInputChange} value={recipeInfo.rec_description}/>
            <p>The description should be one short sentance, like "A delicious Pizza, just like from Italy"</p>
        </div>
    ), second:(
        <div id="addRecipeContent">
            <h2>Add allergens:</h2>
            <div id="allergenInputDiv">
                <input type="text" list="allergens_list" name="allergen_input" id="allergen_input" placeholder="Allergens" onChange={handleInputChange} value={specialInputs.allergen_input}/>
                <button type="button" value="add" onClick={handleClick} data-value="add_allergen">Add</button>
            </div>
            <div id="allergenContainerDiv">
                {specialValues["allergen_input"].map(allergen => (
                    <React.Fragment key={allergen}>
                        <button onClick={handleRemove} className="addRecipeElementBtn" data-value="allergen_btn" value={allergen}>{allergen}</button>
                    </React.Fragment>
                ))}
            </div>
            <datalist id="allergens_list">
                <option value="wheat"></option>
                <option value="eggs"></option>
                <option value="peanuts"></option>
                <option value="soybeans"></option>
                <option value="milk"></option>
                <option value="fish"></option>
                <option value="shellfish"></option>
                <option value="tree nuts"></option>
                <option value="sesame seeds"></option>
                <option value="mustard"></option>
                <option value="celery"></option>
                <option value="lupin"></option>
                <option value="sulfites"></option>
                
                <option value="almonds"></option>
                <option value="hazelnuts"></option>
                <option value="pecans"></option>
                <option value="cashews"></option>
                <option value="pistachios"></option>
                <option value="brazil nuts"></option>
                <option value="walnuts"></option>
                <option value="macadamia nuts"></option>
                <option value="pine nuts"></option>
                <option value="chestnuts"></option>
                <option value="sesame"></option>
                <option value="poppy seeds"></option>
                <option value="kiwi"></option>
                <option value="banana"></option>
                <option value="melon"></option>
                <option value="strawberry"></option>
                <option value="pineapple"></option>
                <option value="mango"></option>
                <option value="papaya"></option>
                <option value="passion fruit"></option>
                <option value="apple"></option>
                <option value="pear"></option>
                <option value="peach"></option>
                <option value="plum"></option>
                <option value="apricot"></option>
                <option value="cherry"></option>
                <option value="avocado"></option>
                <option value="fig"></option>
                <option value="raspberry"></option>
                <option value="blackberry"></option>
                <option value="blueberry"></option>
                <option value="gooseberry"></option>
                <option value="cranberry"></option>
                <option value="currant"></option>
                <option value="coconut"></option>
                <option value="chocolate"></option>
                <option value="coffee"></option>
                <option value="tea"></option>
                <option value="wine"></option>
                <option value="beer"></option>
                <option value="spirits"></option>
                <option value="liqueurs"></option>
                <option value="cider"></option>
                <option value="meat"></option>
                <option value="poultry"></option>
                <option value="beef"></option>
                <option value="pork"></option>
                <option value="lamb"></option>
                <option value="venison"></option>
                <option value="game meats"></option>
                <option value="rabbit"></option>
                <option value="boar"></option>
                <option value="duck"></option>
                <option value="goose"></option>
                <option value="turkey"></option>
                <option value="chicken"></option>
                <option value="quail"></option>
                <option value="pigeon"></option>
                <option value="veal"></option>
                <option value="honey"></option>
                <option value="yeast"></option>
                <option value="gluten"></option>
                <option value="monosodium glutamate (MSG)"></option>
                <option value="sulphur dioxide and sulphites"></option>
                <option value="artificial colors"></option>
                <option value="artificial flavors"></option>
                <option value="sunflower seeds"></option>
                <option value="pumpkin seeds"></option>
                <option value="quinoa"></option>
                <option value="amaranth"></option>
                <option value="buckwheat"></option>
                <option value="millet"></option>
                <option value="rye"></option>
                <option value="barley"></option>
                <option value="oats"></option>
                <option value="corn"></option>
                <option value="rice"></option>
                <option value="sweet potato"></option>
                <option value="potato"></option>
                <option value="tomato"></option>
                <option value="bell pepper"></option>
                <option value="chili pepper"></option>
                <option value="eggplant"></option>
                <option value="cucumber"></option>
                <option value="zucchini"></option>
                <option value="squash"></option>
                <option value="carrot"></option>
                <option value="beetroot"></option>
                <option value="spinach"></option>
                <option value="kale"></option>
                <option value="lettuce"></option>
                <option value="cabbage"></option>
                <option value="broccoli"></option>
                <option value="cauliflower"></option>
                <option value="brussels sprouts"></option>
                <option value="turnip"></option>
                <option value="parsnip"></option>
                <option value="rutabaga"></option>
                <option value="radish"></option>
                <option value="asparagus"></option>
                <option value="artichoke"></option>
                <option value="celeriac"></option>
                <option value="fennel"></option>
                <option value="leek"></option>
                <option value="onion"></option>
                <option value="garlic"></option>
                <option value="ginger"></option>
                <option value="turmeric"></option>
                <option value="cinnamon"></option>
                <option value="nutmeg"></option>
                <option value="clove"></option>
                <option value="cardamom"></option>
                <option value="anise"></option>
                <option value="fennel seed"></option>
                <option value="caraway"></option>
                <option value="coriander"></option>
                <option value="cumin"></option>
                <option value="fenugreek"></option>
                <option value="mustard seed"></option>
                <option value="paprika"></option>
                <option value="black pepper"></option>
                <option value="white pepper"></option>
                <option value="cayenne pepper"></option>
                <option value="horseradish"></option>
                <option value="wasabi"></option>
                <option value="vanilla"></option>
                <option value="rosemary"></option>
                <option value="thyme"></option>
                <option value="oregano"></option>
                <option value="basil"></option>
                <option value="parsley"></option>
                <option value="mint"></option>
                <option value="dill"></option>
                <option value="sage"></option>
                <option value="bay leaf"></option>
                <option value="tarragon"></option>
                <option value="chervil"></option>
                <option value="chive"></option>
                <option value="citrus fruits"></option>
                <option value="grapes"></option>
                <option value="figs"></option>
                <option value="dates"></option>
                <option value="prunes"></option>
                <option value="persimmons"></option>
                <option value="kiwifruit"></option>
                <option value="plantains"></option>
                <option value="starfruit"></option>
                <option value="guava"></option>
                <option value="dragon fruit"></option>
                <option value="lychee"></option>
                <option value="rambutan"></option>
                <option value="pomegranate"></option>
                <option value="passion fruit"></option>
                <option value="durian"></option>
                <option value="jackfruit"></option>
                <option value="breadfruit"></option>
                <option value="soursop"></option>
                <option value="custard apple"></option>
                <option value="cherimoya"></option>
                <option value="carambola"></option>
                <option value="loquat"></option>
                <option value="mulberry"></option>
                <option value="black currant"></option>
                <option value="red currant"></option>
                <option value="white currant"></option>
                <option value="goji berry"></option>
                <option value="kiwi berry"></option>
                <option value="boysenberry"></option>
                <option value="loganberry"></option>
                <option value="cloudberry"></option>
                <option value="elderberry"></option>
                <option value="huckleberry"></option>
                <option value="gooseberry"></option>
                <option value="blue honeysuckle"></option>
                <option value="sea buckthorn"></option>
                <option value="aronia"></option>
                <option value="juniper berry"></option>
            </datalist>
            <h2>Add macronutrients:</h2>
            <div id="addRecipeFirstRow">
                <input type="number" name="cals" placeholder="Calories"  onChange={handleInputChange} value={recipeInfo.cals}/>
                <input type="number" name="prots" placeholder="Proteins" onChange={handleInputChange} value={recipeInfo.prots}/>
            </div>
            <div id="addRecipeSecondRow">
                <input type="number" name="fats" placeholder="Fats" onChange={handleInputChange} value={recipeInfo.fats}/>
                <input type="number" name="carbs" placeholder="Carbohydrates" onChange={handleInputChange} value={recipeInfo.carbs}/>
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
                <input type="text" name="ingredients_input" id="ingredients_input" placeholder="Ingredients" onChange={handleInputChange} value={specialInputs.ingredients_input}/>
                <button type="button" value="add" onClick={handleClick} data-value="add_ingredients">Add</button>
            </div>
            <div id="allergenContainerDiv">
                {specialValues["ingredients_input"].map(ingredient => (
                    <React.Fragment key={ingredient}>
                        <button onClick={handleRemove} className="addRecipeElementBtn" data-value="ingredients_btn" value={ingredient}>{ingredient}</button>
                    </React.Fragment>
                ))}
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
            <textarea name="procedure" id="addRecipeProcedure" cols="30" rows="10" onChange={handleInputChange} value={recipeInfo.procedure}></textarea>
            <h2 className="addRecipeAboveBtnTitle">Select the most fitting course:</h2>
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
            {/* ERROR MESSAGES: */}
            {error && <h2 id="addRecipeErrorMessage">{error}</h2>}
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

