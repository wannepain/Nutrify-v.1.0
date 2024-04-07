import React, { useState }  from "react";
import LogIn from "./LogIn";
import Homescreen from "./Homescreen";
import SignUp from "./SignUp";
import axios from "axios";
import { useEffect } from "react";
// import from "react";
// import jwt from "jsonwebtoken"

function App() {
  // const [token, setToken] = useState(null);
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const tokenParts = token.split('.');
            
            // Check if the token has three parts
            if (tokenParts.length === 3) {
                // Decode the payload to extract expiration time
                const payload = JSON.parse(atob(tokenParts[1]));
                const expirationTime = payload.exp * 1000; // Convert to milliseconds
    
                // Check if the token is expired
                if (expirationTime > Date.now()) {
                    // setTokenValid(true);
                    // setIsLoggedIn(true)
                } else {
                    console.log('Token has expired.');
                    setTokenValid(false);
                }
            } else {
                console.log('Invalid token format.');
                setTokenValid(false);
            }
        } else {
            console.log('Token is not present.');
            setTokenValid(false);
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

  
  if (isLoggedIn){
    return <div>
      <Homescreen />
    </div>
  } else if(logIn){
    return <div>
      <LogIn setLog={setIsLoggedIn} setLogIn={setLogIn}/>
    </div>
  } else if(signUp){
    return <div>
      <SignUp setSignUp={setSignUp}/>
    </div>
  } else{
    return (
      <div>
        <h1>Welcome to nutrify</h1>
        <div id="inBtnContainer">
          <button onClick={()=>setLogIn(true)} id="logInBtn">Log in</button>
          <button onClick={()=>setSignUp(true)} id="signUpBtn">Sign up</button>
        </div>
      </div>
    );

  }
  
}

export default App;
