import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";

function Navbar(){

    const { isLoggedIn, username, logOutUser } = useContext(AuthContext); 


    return (
        <nav className="Navbar">

            <NavLink to="/">Home</NavLink> | 
            <NavLink to="/articles">Articles</NavLink> | 
            <NavLink to="/categories">Categories</NavLink>

            {isLoggedIn && (
                <>
                    <span> Hi, {username && username.name}</span> 
                    &nbsp;
                    <button onClick={logOutUser}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/signup">Sign Up</NavLink> | 
                    <NavLink to="/login">Login</NavLink>
                </>
            )}


        </nav>
    );
}


export default Navbar;