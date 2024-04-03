import React from "react";
import LogIn from "./LogIn";
import axios from "axios";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  if (isLoggedIn){
    return <h1>Welcome</h1>
  }else {
    return (
      <div>
        <LogIn setLog={setIsLoggedIn}/>
      </div>
    );
  }
  
}

export default App;
