import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      // Perform login request to the backend using Axios
      const response = await axios.post('http://localhost:3000/login', {
        username: 'Marek',
        password: '123456'
      });
      const { data } = response;
      // Set the JWT token and user data
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    // Clear the JWT token and user data
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      <h1>JWT Token Example</h1>
      {token ? (
        <div>
          <p>Welcome, {user.username}</p>
          <p>Token: {token}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default SignUp;
