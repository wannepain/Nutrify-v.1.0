import React from "react";
import LogIn from "./LogIn";
import Homescreen from "./Homescreen";
import axios from "axios";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  if (isLoggedIn){
    return <div>
      <Homescreen />
    </div>
  }else {
    return (
      <div>
        <LogIn setLog={setIsLoggedIn}/>
      </div>
    );

  }
  
}

export default App;
