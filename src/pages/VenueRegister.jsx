import React, { useState } from 'react'
import { Col, Container, Form, Button } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase, {firestore} from '../config/firebase'

const VenueRegister = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [venueId, setVenueId] = useState(new Date().getTime().toString());
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
                })
                pushUser(user)
                dispatch({ type: "LOGIN", data: user.uid})
                history.push(`/venueform`)
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
                setError(errorMessage)
            })
    }

    const pushUser = (user) => {
        firestore.collection("venues").doc(user.uid).set({
            email: user.email,
            venueId: user.uid,
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
        <Container className="justify-content-center d-flex py-5">
            <Col lg={6}>
                <div className="register-card">
                    <h3 className="text-center">Register as venue owner</h3>
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
                        {
                            error !== "" ? <p className="text-danger mt-2 text-center">{error}</p> : null
                        }
                        <br />
                        <p>Alreaady have an account?  <Link to="/venuelogin">Login</Link></p>
                    </Form>
                </div>
            </Col>
        </Container>
    )
}

export default VenueRegister