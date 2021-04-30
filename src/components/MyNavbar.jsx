import React, { } from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import logo from '../assets/logo.png';
import MyButton from '../atom/MyButton';
import './MyNavbar.scss'

const MyNavbar = () => {
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
                        <MyButton title="Login" type="btn-my-secondary" theVariant="outline-primary"/>
                        <MyButton title="Register" type="btn-my-primary" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="space"></div>

        </div>
    )
}

export default MyNavbar