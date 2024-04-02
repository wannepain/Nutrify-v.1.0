import React from "react";
import LogIn from "./LogIn";
import axios from "axios";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <div>
      <LogIn />
    </div>
  );
}

export default App;
