import React from "react";
import LogIn from "./LogIn";
import Homescreen from "./Homescreen";
import SignUp from "./SignUp";
import axios from "axios";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  
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
