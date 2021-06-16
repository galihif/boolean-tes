import React, { useState } from 'react'
import { Col, Container, Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Login.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase,{firestore, auth} from '../config/firebase'

const VenueLogin = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user
                // history.push(`/venuedashboard/${user.uid}`)
                dispatch({ type: "LOGIN", userId: user.uid, userRole: "venueOwner" })
                console.log("state",state.userId)
                console.log("direct",user.uid)
                
                const ref = firestore.collection("venues").where("venueId","==",user.uid)
                ref.onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        const venue = doc.data()
                        dispatch({ type: "setVenueData", venueData: venue })
                        console.log("state",state.venueData)
                        console.log("direct",venue)
                    })
                })
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorCode, errorMessage)
                setError(errorMessage)
            })
    }
    return (
            <Container className="justify-content-center d-flex py-5">
                <Col lg={6}>
                    <div className="login-card">
                        <h3 className="text-center">Login as Venue Owner</h3>
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
                            {
                                error !== "" ? <p className="text-danger mt-2 text-center">{error}</p> : null
                            }
                            <br/>
                            <p>Doesn't have an account?  <Link to="/venueregister">Join us</Link></p>
                        </Form>
                    </div>
                </Col>
            </Container>
    )
    
}

export default VenueLogin