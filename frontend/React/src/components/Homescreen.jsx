import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Recipes from "./Recipes";
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

    return <div>
        <Recipes />
        <NavBar />
      </div>
}
export default Homescreen;