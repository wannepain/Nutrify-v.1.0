import React from "react";

function WeightHeight(props) {
    return (
        <div id="weightHeightContainer">
            <div id="weightContainer">
                <label htmlFor="weight">What's your current weight?</label>
                <input type="number" name="weight" id="dietWeight" placeholder="75kg"/>
            </div>
            <div id="heightContainer">
                <label htmlFor="height">How tall are you?</label>
                <input type="number" name="height" id="dietHeight" placeholder="180cm"/>
            </div>
        </div>
    )
}

export default WeightHeight;