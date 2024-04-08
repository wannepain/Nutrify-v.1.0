
import React, { useState } from "react";

function GoalActiFac(props) {
    const [selectedGoal, setSelectedGoal] = useState("");
    const [selectedActiFac, setSelectedActiFac] = useState("");
    const [wantToSelectGoal, setWantToSelectGoal] = useState(false);
    const [wantToSelectActivity, setWantToSelectActivity] = useState(false);

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
        } else {
            setSelectedActiFac(option);
            setWantToSelectActivity(false)
        }
        // setSelectedOption(option);
        // setWantToSelectGoal(false);
        // setWantToSelectActivity(false);
    }

    return (
        <div id="goalActiFacContainer">
            <div id="goalContainer" className="dropdownContainer" onMouseLeave={()=>{setWantToSelectGoal(false) }}>
                <h3>What's your goal??</h3>
                <div className="dropdown-container">
                    <button type="button" id="mainDietBtn" name="goalBtn" onClick={() => handleClick("goalBtn")}>
                        {selectedGoal === "" ? "Select goal..." : selectedGoal}
                    </button>
                    {wantToSelectGoal && (
                        <div id="goalSelectContainer" className="optionsContainer">
                            <button type="button" id="dietTopBtn" className="goalBtn" onClick={() => handleSelect("Lose weight")}>
                                Lose weight
                            </button>
                            <button type="button" id="dietMiddleBtn" className="goalBtn" onClick={() => handleSelect("Maintain weight")}>
                                Maintain weight
                            </button>
                            <button type="button" id="dietBottomBtn" className="goalBtn" onClick={() => handleSelect("Gain weight (muscle)")}>
                                Gain weight (muscle)
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="actiFacContainer" className="dropdownContainer" onMouseLeave={()=>{setWantToSelectActivity(false) }}>
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
