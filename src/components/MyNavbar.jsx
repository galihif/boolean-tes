import React, { useState, useEffect} from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    Link
} from "react-router-dom";
import firebase from '../config/firebase'

import logo from '../assets/logo.png';
import './MyNavbar.scss'

const MyNavbar = () => {
    const [logged, setLogged] = useState(false)
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    let history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                setLogged(true)
                setUserId(user.uid)
                setUserName(user.displayName)
            } else {
                setLogged(false)
                setUserId("")
                setUserName("")
            }
        })
    })

    const pushLogin = () => {
        history.push('/login')
    }
    const pushRegister = () => {
        history.push('/register')
    }
    const pushProfile = () => {
        history.push(`/profile/user/${userId}`)
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
                        {
                            logged ?
                                <Button onClick={pushProfile} className="btn-my-primary" variant="outline-primary" >{userName}</Button>
                                : 
                            <div>
                                <Button onClick={pushLogin} className="btn-my-secondary" variant="outline-primary" >Login</Button>
                                <Button onClick={pushRegister} className="btn-my-primary" variant="outline-primary" >Register</Button>
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="space"></div>

        </div>
    )
}

export default MyNavbar