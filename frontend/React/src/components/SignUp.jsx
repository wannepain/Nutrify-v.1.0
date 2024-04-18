import React, { useState, useEffect } from "react";
import axios from "axios";
import Allergies from "./signUp/Allergies";
import Diet from "./signUp/Diet";
import WeightHeight from "./signUp/WeightHeight";
import GenderAge from "./signUp/GenderAge";
import GoalActiFac from "./signUp/GoalActiFac";

function SignUp(props) {
    const [isFirstPartDone, setIsFirstPartDone] = useState(false);
    const [values, setValues] = useState({ username: "", password: "", passwordCheck: "" });
    const [error, setError] = useState(false);
    const [finalObject, setFinalObject] = useState({});
    const [isUsernameAdded, setIsUsernameAdded] = useState(false);
    let axiosQuery;

    function handleChange(event) {
        const { name, value } = event.target;
        setValues(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleContinue(event) {
        event.preventDefault();
        const { username, password, passwordCheck } = values;
        if (username === "" || password === "") {
            setError("Username and password mustn't be empty");
        } else if (password !== passwordCheck) {
            setError("Passwords don't match");
        } else {
            // Add user to database 
            try {
                const result = await axios.post("http://localhost:3000/signup",{username: username, password:password})
                console.log(result);
                setIsFirstPartDone(true);
                setFinalObject(prevFinalObject => ({ ...prevFinalObject, username: values.username }));
            } catch (error) {
                if(error.response.status === 409){
                    setError("Username already exists");
                    setValues(prevState => ({ ...prevState, username: "" }));
                }
                console.error(error);
            }
            
        }
    }
    function handleReturn(event) {
        event.preventDefault()
        props.setSignUp(false)
      }
    function handleBackToFirstPart(event) {
        setIsFirstPartDone(false)
    }
    function addToObj(object) {
        // Include username in the object obtained from child components
        const updatedObject = { ...object };
        setFinalObject(prevFinalObject => ({ ...prevFinalObject, ...object}));
    }
    
    
    // useEffect(() => {
    //     console.log(values.username);
    //     if (values.username !== "" && !isUsernameAdded) {
    //         setFinalObject(prevFinalObject => ({ ...prevFinalObject, username: values.username }));
    //         setIsUsernameAdded(true);
    //     }
    // }, [values.username, isUsernameAdded]); 
    
    async function handleSignUp(event) {
        event.preventDefault();
        console.log(finalObject);
        try {
            const result = await axios.post("http://localhost:3000/signup/nutrition", finalObject)
            if (result.status === 200) {
                props.setSign(true);
            }
            console.log(result.data.rows);
        } catch (error) {
            console.log(error);
        }
        
    }
    if (isFirstPartDone) {
        return (
            <div>
                <h2 onClick={handleBackToFirstPart} className="goBackH2"><img src="./../../public/resources/caret-left.svg" alt="Back" className="goBackIcon"/> Go back</h2>
                <form>
                    <h1 id="SignUp">Sign up</h1>
                    <div id="secondSignUpContainer">
                        <input type="hidden" value={values.username} name="username"/>
                        <Allergies error={setError} obj={addToObj}/>
                        <Diet obj={addToObj}/>
                        <WeightHeight obj={addToObj}/>
                        <GenderAge obj={addToObj}/>
                        <GoalActiFac obj={addToObj}/>
                    </div>
                    <button className="formBtn" onClick={handleSignUp}>Sign up</button>
                    {!error ? null : <p id='error'>{error}</p>}
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h2 onClick={handleReturn} className="goBackH2"><img src="./../../public/resources/caret-left.svg" alt="Back" className="goBackIcon"/> Go back</h2>
                <form id="signUpForm">
                    <h1 id="SignUp">Sign up</h1>
                    <div className="inputContainer">
                        <input
                            name='username'
                            className='topInput'
                            type="text"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleChange}
                            autoComplete='username'
                        />
                        <input
                            name='password'
                            className='middleInput'
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            autoComplete='new-password'
                        />
                        <input
                            name='passwordCheck'
                            className="bottomInput"
                            type="password"
                            placeholder="Confirm Password"
                            value={values.passwordCheck}
                            onChange={handleChange}
                            autoComplete='new-password'
                        />
                    </div>
                    {!error ? null : <p id='error'>{error}</p>}
                    <button onClick={handleContinue} className="formBtn">Continue</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
