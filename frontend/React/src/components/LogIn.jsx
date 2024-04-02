
import React, { useState } from 'react';
import axios from 'axios';
import "./../../public/LogIn.css"

function LogIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Perform login request to the backend using Axios
      const response = await axios.post('http://localhost:3000/login/local', {
        username: username,
        password: password
      });
      console.log(response);
      // Handle successful login, e.g., redirect to another page
      // or store authentication token in local storage
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form id='logInForm'>
        <input
          name='Username'
          className='topInput'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='bottomInput'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="formBtn" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default LogIn;
