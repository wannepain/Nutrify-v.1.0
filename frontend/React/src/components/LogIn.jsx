
import React, { useState } from 'react';
import axios from 'axios';
import "./../../public/LogIn.css"

function LogIn(props) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;
    name === "Username"? setValues({ username: value, password: values.password }) : setValues({ username: values.username, password: value });
    // setValues({ ...values, [name]: value });
  }
  // Function to get cookie value by name
    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    }
  const handleLogin = async (event) => {
    event.preventDefault();
    const {username, password} = values
    if(username === "" || password === ""){
      setError("Username and password mustn't be empty");
    }else{
      try {
        // Perform login request to the backend using Axios
        const response = await axios.post('http://localhost:3000/login/local', {
          username: username,
          password: password
        });
        console.log(response);
        // Handle successful login, e.g., redirect to another page
        // or store authentication token in local storage
        if (response.status === 200){
          const token = response.data.token;
          console.log(token);
          // const [header, payload, signature] = token.split(".");
          // Set up the cookies
          document.cookie = `jwtToken=${token}; Secure; HttpOnly; SameSite=Strict`;
          props.setLog(true);
        } 
      } catch (error) {
        console.error('Login error:', error);
        const err = error.response.status
        if(err === 401){
          setError("Incorrect password or username");
        } else{
          setError("Server error, please try again later")
        }
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form id='logInForm'>
        <div className='inputContainer'>
          <input
            name='Username'
            className='topInput'
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            autoComplete='username'
          />
          <input
            className='bottomInput'
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            autoComplete='current-password'
          />
        </div>
        {!error? null : <p id='error'>{error}</p>}
        <button className="formBtn" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default LogIn;
