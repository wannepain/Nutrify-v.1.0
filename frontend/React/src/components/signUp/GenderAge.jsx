import React, {useState} from "react";

function GenderAge(props) {
    const [selectedOption, setSelectedOption] = useState("");
    const [wantToSelect, setWantToSelect] = useState(false);

    function handleClick() {
        setWantToSelect(!wantToSelect);
    }

    function handleSelect(option) {
        setSelectedOption(option);
        setWantToSelect(false);
    }
    return (
        <div id="genderAgeContainer">
            <div id="genderContainer" className="dropdownContainer">
                <h3>What gender are you?</h3>
                <div className="dropdown-container">
                    <button type="button" id="mainDietBtn" onClick={handleClick}>
                        {selectedOption === "" ? "Select gender..." : selectedOption}
                    </button>
                    {wantToSelect && (
                        <div id="genderSelectContainer" className="optionsContainer">
                            <button type="button" id="dietTopBtn" onClick={() => handleSelect("Male")}>
                                Male
                            </button>
                            <button type="button" id="dietBottomBtn" onClick={() => handleSelect("Female")}>
                                Female
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="ageContainer">
                <label htmlFor="age">How old are you?</label>
                <input type="number" name="age" id="userAge" placeholder="25"/>
            </div>
        </div>
    )
}

export default GenderAge;