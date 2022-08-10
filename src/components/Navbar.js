import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from "react-router-dom";


function NavBar() {

    const navigate = useNavigate();
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const logOutAndNavigate = () => {
        logOutUser();
        navigate("/");
    }


    return (
        
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <image src="public/images/malatesta.png" alt="" width="30" height="24" class="d-inline-block align-text-top" />
                    <Nav.Link as={Link} to="/">Home</Nav.Link>                    
                    <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                    <Nav.Link as={Link} to="/categories">Categories</Nav.Link>

                    {isLoggedIn && (
                        <>
                            <div className="text-white my-2 mx-2 px-2">{user && user.name}</div>
                            <Nav.Link onClick={logOutAndNavigate}>Logout</Nav.Link>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link> |
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}


export default NavBar;