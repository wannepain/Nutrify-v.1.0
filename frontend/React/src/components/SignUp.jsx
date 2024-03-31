import React, { useState } from "react";
import axios from "axios";

function SignUp(props) {
    const [result, setResult] = useState(null);

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:3000/isLoggedIn", {
                username: "John",
                // password: "123456"
            });
            setResult(response.data); // Assuming the response contains data to display
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={handleSignUp}>Sign Up</button>
            {result && <div>{result}</div>}
        </div>
    );
}

export default SignUp;
