import React, { useState } from 'react'
import { Col, Container, Form, Button } from 'react-bootstrap'
import {useHistory,Link} from 'react-router-dom'

import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase, {firestore} from '../config/firebase'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    let history = useHistory()

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
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    const pushUser = (user) => {
        firestore.collection("users").doc(user.uid).set({
            email: user.email,
            name: name,
            userId: user.uid,
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
                        <Button onClick={handleSubmit} variant="primary" type="" className="btn-block">
                            Register
                        </Button>
                        <br />
                        <p>Alreaady have an account?  <Link to="/login">Login</Link></p>
                    </Form>
                </div>
            </Col>
        </Container>
    )
}

export default Register