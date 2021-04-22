import React, { } from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap';

import logo from '../assets/logo.png';
import MyButton from '../atom/MyButton';
import './MyNavbar.scss'

const MyNavbar = () => {
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light" fixed="top" className="my-navbar">
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        className="d-inline-block align-top img-logo"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="nav-my-link">Home</Nav.Link>
                        <Nav.Link href="#venues" className="nav-my-link">Venues</Nav.Link>
                        <Nav.Link href="#about" className="nav-my-link">About Us</Nav.Link>
                    </Nav>
                    <Nav>
                        <MyButton title="Login" type="btn-my-secondary" theVariant="outline-primary"/>
                        <MyButton title="Register" type="btn-my-primary" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default MyNavbar