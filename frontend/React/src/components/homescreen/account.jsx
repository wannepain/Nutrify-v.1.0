import React, { useState } from "react";

function Account(props) {
    const [selectedOption, setSelectedOption] = useState(null)

    function handleLogOut(event) {
        
    }
    function handleAccountInfo(event) {
        setSelectedOption("account_info")
    }


    let jsxToRender;

    if (selectedOption) {
        jsxToRender = (
            <div>
                <div>
                    <h1>Account info</h1>
                    <button type="button">Save changes</button>
                </div>

                <input type="text" name="username" id="accountInfoUsername" />
                <div>
                    <input type="password" name="password" id="accountInfoPassword" />
                    <input type="password" name="password_confirm" id="accountInfoPassConfirm" />
                </div>
                <div>
                    {/* map over allergens here */}
                </div>
                <input type="text" name="diet" id="accountInfoDiet" />
                <input type="text" name="goal" id="accountInfoGoal" />

                <div>
                    <input type="number" name="height" id="accountInfoHeight" />
                    <input type="number" name="weight" id="accountInfoWeight" />
                </div>

                <div>
                    <input type="text" name="goal" id="accountInfoGoal" />
                    {/* dropdown for gender */}
                </div>

                <div>
                    <input type="number" name="age" id="accountInfoAge" />
                    <input type="text" name="actifac" id="accountInfoActifac" />
                </div>
            </div>
        )
    } else {
        jsxToRender = (
            <div>
                <p>Acount</p>
                <div>
                    <button type="button" onClick={handleLogOut}>Log Out</button>
                    <button type="button" onClick={handleAccountInfo}>Account Information</button>
                </div>
            </div>
        )
    }
    return(
        <div>
            {jsxToRender}
        </div>
    )
}

export default Account;