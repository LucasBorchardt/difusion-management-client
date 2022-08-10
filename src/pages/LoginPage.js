import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from '../context/auth.context';


function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);


    const navigate = useNavigate();


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
            .then((response) => {
                // Request to the server's endpoint `/auth/login` returns a response
                // with the JWT string ->  response.data.authToken
                console.log('JWT token', response.data.authToken);

                storeToken(response.data.authToken);
                authenticateUser();

                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}


            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card shadow-lg" id="no-scale">
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-group mb-3">
                            <div className="form-floating-label-transform:   scale(.85) translateY(-.5rem) translateX(.15rem)">
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
                                <button type="submit" class="btn btn-dark">Log In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage;