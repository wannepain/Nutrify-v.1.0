import React from "react";
import axios from "axios";
function Homescreen(props) {
    axios.interceptors.request.use(
        (config) => {
          const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwtToken='));
          if (token) {
            config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

    async function handleClick(event) {
        event.preventDefault();
        const result = await axios.post("http://localhost:3000/dailyMenu", {}, {withCredentials: true});
        console.log(result);
    }
    return <form > 
        <button onClick={handleClick}>Hello</button>
    </form>
}
export default Homescreen;