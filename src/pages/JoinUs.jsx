import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router'

import './JoinUs.scss'
import { Button, Jumbotron, Form, Col, Container, Row } from 'react-bootstrap';
import img_join from '../assets/img_join.png'


const JoinUs = () => {
    const history = useHistory()

    useEffect(() => {
        document.title = "Join Us"
    });

    const handleRegister= () => {
        history.push("/venueregister")
    }
    const handleLogin= () => {
        history.push("/venuelogin")
    }
    return(
        <div>
            <Jumbotron className="join-container ">
                <div className="join-tagline m-5 pt-5">
                    <h1>Maximize your customer,</h1>
                    <h1>Minimize your effort</h1>
                    <p className="py-3">
                        Enjoy various benefits by becoming a Boolean venue partner
                    </p>
                    <Button onClick={handleRegister} className="btn-my-primary align-self-center" variant="primary" >Register</Button>
                    <Button onClick={handleLogin} className="btn-join-secondary" variant="outline-primary" >Login</Button>
                </div>
            </Jumbotron>
        </div>
    )
}

export default JoinUs