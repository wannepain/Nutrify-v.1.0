
// import React, { useState } from "react";

// function GenderAge(props) {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [wantToSelect, setWantToSelect] = useState(false);
//     const [currentAge, setCurrentAge] = useState(null);

//     function handleClick() {
//         setWantToSelect(!wantToSelect);
//     }

//     function handleSelect(option) {
//         setSelectedOption(option);
//         setWantToSelect(false);
//         props.obj({ age: currentAge, gender: option==="Female"?"f":"m" });
//     }

//     function handleChange(event) {
//         setCurrentAge(event.target.value);
//         if (selectedOption !== "" && event.target.value !== "") {
//             props.obj({ age: event.target.value, gender: selectedOption==="Female"?"f":"m" });
//         }
//     }

//     return (
//         <div id="genderAgeContainer">
//             <div id="genderContainer" className="dropdownContainer">
//                 <h3>What gender are you?</h3>
//                 <div className="dropdown-container">
//                     <button type="button" id="mainDietBtn" onClick={handleClick}>
//                         {selectedOption === "" ? "Select gender..." : selectedOption}
//                     </button>
//                     {wantToSelect && (
//                         <div id="genderSelectContainer" className="optionsContainer">
//                             <button type="button" id="dietTopBtn" onClick={() => handleSelect("Male")}>
//                                 Male
//                             </button>
//                             <button type="button" id="dietBottomBtn" onClick={() => handleSelect("Female")}>
//                                 Female
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div id="ageContainer">
//                 <label htmlFor="age">How old are you?</label>
//                 <input type="number" name="age" id="userAge" placeholder="25" onChange={handleChange} value={currentAge} />
//             </div>
//         </div>
//     );
// }

// export default GenderAge;

import React, { useState, useEffect } from "react";

function GenderAge(props) {
    const [selectedOption, setSelectedOption] = useState("");
    const [wantToSelect, setWantToSelect] = useState(false);
    const [currentAge, setCurrentAge] = useState(null);

    useEffect(() => {
        if (selectedOption !== "" && currentAge !== null) {
            props.obj({ age: currentAge, gender: selectedOption === "Female" ? "f" : "m" });
        }
    }, [selectedOption, currentAge]);

    function handleClick() {
        setWantToSelect(!wantToSelect);
    }

    function handleSelect(option) {
        setSelectedOption(option);
        setWantToSelect(false);
    }

    function handleChange(event) {
        setCurrentAge(event.target.value);
        if (selectedOption !== "" && event.target.value !== "") {
            props.obj({ age: event.target.value, gender: selectedOption === "Female" ? "f" : "m" });
        }
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
                <input type="number" name="age" id="userAge" placeholder="25" onChange={handleChange} value={currentAge} />
            </div>
        </div>
    );
}

export default GenderAge;
