
import React, { useState, useEffect } from "react";

function GoalActiFac(props) {
    // const [selectedGoal, setSelectedGoal] = useState("");
    // const [selectedActiFac, setSelectedActiFac] = useState("");
    // const [wantToSelectGoal, setWantToSelectGoal] = useState(false);
    // const [wantToSelectActivity, setWantToSelectActivity] = useState(false);

    // useEffect(() => {
    //     if (selectedGoal !== "" && selectedActiFac !== "") {
    //         props.obj({ goal: selectedGoal, activity: selectedActiFac });
    //     }
    // }, [selectedGoal, selectedActiFac, props]);

    // function handleClick(buttonType) {
    //     if (buttonType === "goalBtn") {
    //         setWantToSelectGoal(!wantToSelectGoal);
    //         setWantToSelectActivity(false); // Reset activity selection
    //     } else {
    //         setWantToSelectGoal(false); // Reset goal selection
    //         setWantToSelectActivity(!wantToSelectActivity);
    //     }
    // }

    // function handleSelect(option) {
    //     if (option === "Lose weight" || option === "Maintain weight" || option === "Gain weight (muscle)") {
    //         setSelectedGoal(option);
    //         setWantToSelectGoal(false);
    //     } else {
    //         setSelectedActiFac(option);
    //         setWantToSelectActivity(false);
    //     }
    // }

    const [selectedGoal, setSelectedGoal] = useState("");
    const [selectedActiFac, setSelectedActiFac] = useState("");
    const [wantToSelectGoal, setWantToSelectGoal] = useState(false);
    const [wantToSelectActivity, setWantToSelectActivity] = useState(false);
    const [selectedGoalShort, setSelectedGoalShort] = useState("");

    function handleClick(buttonType) {
        if (buttonType === "goalBtn") {
            setWantToSelectGoal(!wantToSelectGoal);
            setWantToSelectActivity(false); // Reset activity selection
        } else {
            setWantToSelectGoal(false); // Reset goal selection
            setWantToSelectActivity(!wantToSelectActivity);
        }
    }

    function handleSelect(option) {
        if (option === "Lose weight" || option === "Maintain weight" || option === "Gain weight (muscle)") {
            setSelectedGoal(option);
            setWantToSelectGoal(false);
            switch (option) {
                case "Lose weight":
                    setSelectedGoalShort("lose");
                    break;
                case "Maintain weight":
                    setSelectedGoalShort("maintain");
                    break;
                case "Gain weight (muscle)":
                    setSelectedGoalShort("gain");
                    break;
                default:
                    break;
            }
        } else {
            setSelectedActiFac(option);
            setWantToSelectActivity(false);
        }
    }

// Local variable to store the object to be passed to props.obj
const objToPass = { goal: selectedGoalShort, activity: selectedActiFac.toLocaleLowerCase() };

useEffect(() => {
    // Only call props.obj when both selectedGoal and selectedActiFac are not empty
    if (selectedGoal !== "" && selectedActiFac !== "") {
        props.obj(objToPass);
    }
}, [selectedGoal, selectedActiFac]);
    return (
        <div id="goalActiFacContainer">
            <div id="goalContainer" className="dropdownContainer" >
                <h3>What's your goal??</h3>
                <div className="dropdown-container">
                    <button type="button" id="mainDietBtn" name="goalBtn" onClick={() => handleClick("goalBtn")}>
                        {selectedGoal === "" ? "Select goal..." : selectedGoal}
                    </button>
                    {wantToSelectGoal && (
                        <div id="goalSelectContainer" className="optionsContainer">
                            <button type="button" id="dietTopBtn" className="goalBtn" name="lose" onClick={() => handleSelect("Lose weight")}>
                                Lose weight
                            </button>
                            <button type="button" id="dietMiddleBtn" className="goalBtn" name="maintain" onClick={() => handleSelect("Maintain weight")}>
                                Maintain weight
                            </button>
                            <button type="button" id="dietBottomBtn" className="goalBtn" name="gain" onClick={() => handleSelect("Gain weight (muscle)")}>
                                Gain weight (muscle)
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="actiFacContainer" className="dropdownContainer" >
                <h3>How active are you?</h3>
                <div className="dropdown-container">
                    <button type="button" id="mainDietBtn" name="activityBtn" onClick={() => handleClick("activityBtn")}>
                        {selectedActiFac === "" ? "Select activity level..." : selectedActiFac}
                    </button>
                    {wantToSelectActivity && (
                        <div id="activitySelectContainer" className="optionsContainer">
                            <button type="button" id="dietTopBtn" onClick={() => handleSelect("Sedentary")}>
                                Sedentary 
                            </button>
                            <button type="button" id="dietMiddleBtn" onClick={() => handleSelect("Light")}>
                                Light 
                            </button>
                            <button type="button" id="dietMiddleBtn" onClick={() => handleSelect("Moderate")}>
                                Moderate 
                            </button>
                            <button type="button" id="dietMiddleBtn" onClick={() => handleSelect("Active")}>
                                Active 
                            </button>
                            <button type="button" id="dietBottomBtn" onClick={() => handleSelect("Very active")}>
                                Very active 
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GoalActiFac;
