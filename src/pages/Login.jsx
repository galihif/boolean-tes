import React, { useState } from 'react'
import { Col, Container, Form, Button, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Login.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from '../config/firebase'

const Login = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory()

    const handleChange = (e) => {
        switch(e.target.id){
            case "email":
                setEmail(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            default:
                return null
        }
    }

    const handleSubmit = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user
                if(user.email === 'admin@boolean.com'){
                    history.push(`/admin`)
                    dispatch({ type: "LOGIN", userId: user.uid, userRole: "admin" })
                } else {
                    history.push(`/profile/user/${user.uid}`)
                    dispatch({ type: "LOGIN", userId: user.uid, userRole: "user" })
                }
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }
    return (
            <Container className="justify-content-center d-flex py-5">
                <Col lg={6}>
                    <div className="login-card">
                        <h3 className="text-center">Login</h3>
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
                            </Form.Group>
                            <Button variant="primary" type="" className="btn-block" onClick={handleSubmit}>
                                Login
                            </Button>
                            <br/>
                            <Row className="d-flex justify-content-center">
                                <p>Doesn't have an account?  <Link to="/register">Register</Link></p>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <p>Login as venue owner  <Link to="/venuelogin">here</Link></p>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Container>
    )
    
}

export default Login