import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

function NavBar({ setSearch = () => { } }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin) || {}
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <Navbar bg="primary" variant="dark" expand="lg" >
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    Note Zipper
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll" className="w-100" navbarScroll>

                    <Nav className='m-auto'>
                        <Form className="d-flex ms-auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearch?.(e.target.value)}
                            />
                        </Form>
                    </Nav>

                    {userInfo ? (
                        <Nav className="text-center">
                            <Nav.Link as={Link} to='/mynotes'>
                                My Notes
                            </Nav.Link>
                            <NavDropdown title={typeof userInfo === "object" ? userInfo.name : "Profile"} id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>) :
                        (<Nav>
                            <Nav.Link as={Link} to='/login'>
                                Login
                            </Nav.Link>
                        </Nav>)}


                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar;
