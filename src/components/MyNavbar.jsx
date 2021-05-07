import React, { } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    Link
} from "react-router-dom";

import logo from '../assets/logo.png';
import MyButton from '../atom/MyButton';
import './MyNavbar.scss'

const MyNavbar = () => {
    let history = useHistory()
    const pushLogin = () => {
        history.push('/login')
    }
    const pushRegister = () => {
        history.push('/register')
    }
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="my-navbar fixed-top">
                <Navbar.Brand href="#home">
                    <Link to="/">
                        <img
                            src={logo}
                            className="d-inline-block align-top img-logo"
                            alt="React Bootstrap logo"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="nav-my-link">
                            <Link to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link className="nav-my-link">
                            <Link to="/venues">Venues</Link>
                        </Nav.Link>
                        <Nav.Link className="nav-my-link">
                            <Link to="/about" href="">About Us</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Button onClick={pushLogin} className="btn-my-secondary" variant="outline-primary" >Login</Button>
                        <Button onClick={pushRegister} className="btn-my-primary" variant="outline-primary" >Register</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="space"></div>

        </div>
    )
}

export default MyNavbar