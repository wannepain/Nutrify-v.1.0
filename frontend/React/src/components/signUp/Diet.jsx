
// import React, { useState } from "react";

// function Diet(props) {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [wantToSelect, setWantToSelect] = useState(false);

//     function handleClick() {
//         setWantToSelect(!wantToSelect);
//     }

//     function handleSelect(option) {
//         setSelectedOption(option);
//         setWantToSelect(false);
//         props.obj({diet:selectedOption});
//     }

//     return (
//         <div id="dietContainer" className="dropdownContainer" >
//             <h3>What diet are you following?</h3>
//             <div className="dropdown-container">
//                 <button type="button" id="mainDietBtn" onClick={handleClick}>
//                     {selectedOption === "" ? "Select diet..." : selectedOption}
//                 </button>
//                 {wantToSelect && (
//                     <div id="dietSelectContainer" className="optionsContainer">
//                         <button type="button" id="dietTopBtn" onClick={() => handleSelect("Vegan")}>
//                             Vegan
//                         </button>
//                         <button type="button" id="dietMiddleBtn" onClick={() => handleSelect("Vegetarian")}>
//                             Vegetarian
//                         </button>
//                         <button type="button" id="dietBottomBtn" onClick={() => handleSelect("Omnivorous")}>
//                             Omnivorous
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Diet;
import React, { useState, useEffect } from "react";

function Diet(props) {
    const [selectedOption, setSelectedOption] = useState("");
    const [wantToSelect, setWantToSelect] = useState(false);

    useEffect(() => {
        props.obj({ diet: selectedOption.toLocaleLowerCase() });
    }, [selectedOption]);

    function handleClick() {
        setWantToSelect(!wantToSelect);
    }

    function handleSelect(option) {
        setSelectedOption(option);
        setWantToSelect(false);
    }

    return (
        <div id="dietContainer" className="dropdownContainer">
            <h3>What diet are you following?</h3>
            <div className="dropdown-container">
                <button type="button" id="mainDietBtn" onClick={handleClick}>
                    {selectedOption === "" ? "Select diet..." : selectedOption}
                </button>
                {wantToSelect && (
                    <div id="dietSelectContainer" className="optionsContainer">
                        <button type="button" id="dietTopBtn" onClick={() => handleSelect("Vegan")}>
                            Vegan
                        </button>
                        <button type="button" id="dietMiddleBtn" onClick={() => handleSelect("Vegetarian")}>
                            Vegetarian
                        </button>
                        <button type="button" id="dietBottomBtn" onClick={() => handleSelect("Omnivorous")}>
                            Omnivorous
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Diet;
