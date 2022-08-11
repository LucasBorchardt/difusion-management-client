import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";






function SignupPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            email,
            username,
            password
        }; // Create an object representing the request body

        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios
            .post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card shadow-lg" id="no-scale">
                    <form onSubmit={handleSignupSubmit}>
                        <div class="input-group mb-3">
                            <div class="form-floating-label-transform:   scale(.85) translateY(-.5rem) translateX(.15rem)">

                                <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="email"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" class="btn btn-dark">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;