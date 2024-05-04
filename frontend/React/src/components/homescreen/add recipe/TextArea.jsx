import React, { useState } from "react";

function TextArea(props) {
    const [isHidden, setIsHidden] = useState(false)

    function handleFocus(event) {
        setIsHidden(true);
    }
    function handleBlur(event) {
        setIsHidden(false);
    }

    return (
        <div id="ingredientsDiv">
            <label htmlFor="ingredients_input" className={isHidden? "textAreaLabel textAreaHidden" : "textAreaLabel"}>{props.labelText}</label>
            <textarea name={props.name} id="ingredients_input" cols="30" rows="10" onFocus={handleFocus} onBlur={handleBlur} placeholder={isHidden && props.labelText}></textarea>
        </div>
    )
}
export default TextArea;