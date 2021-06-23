import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Button, Row } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase, { auth, provider, firestore } from '../config/firebase'

const Register = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    let history = useHistory()

    useEffect(() => {
        document.title = "Register"
    });

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                setName(e.target.value)
                break
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
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user
                user.updateProfile({
                    displayName: name,
                    photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                })
                
                if (user.email === 'admin@boolean.com') {
                    history.push(`/admin`)
                } else {
                    history.push(`/profile/user/${user.uid}`)
                }
                pushUser(user)
                dispatch({ type: "LOGIN", userData: user, userRole: "user" })
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    const googleSignIn = () => {
        auth.signInWithPopup(provider)
            .then((res) => {
                let credential = res.credential
                let user = res.user
                history.push(`/profile/user/${user.uid}`)
                dispatch({ type: "LOGIN", userData: user, userRole: "user" })
                pushUser(user)
            })
    }

    const pushUser = (user) => {
        let date = new Date()
        firestore.collection("users").doc(user.uid).set({
            email: user.email,
            name: name,
            userId: user.uid,
            joinedAt: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
        <Container className="justify-content-center d-flex py-5">
            <Col lg={6}>
                <div className="register-card">
                    <h3 className="text-center">Register</h3>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={handleSubmit} variant="primary" type="" className="btn-block btn-my-primary">
                            Register
                        </Button>
                        <Row className="d-flex justify-content-center my-3">
                            <GoogleButton  onClick={googleSignIn}/>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <p>Already have an account?  <Link to="/login">Login</Link></p>
                        </Row>
                        {/* <Row className="d-flex justify-content-center">
                            <p>Register as venue owner  <Link to="/venueregister">here</Link></p>
                        </Row> */}
                    </Form>
                </div>
            </Col>
        </Container>
    )
}

export default Register