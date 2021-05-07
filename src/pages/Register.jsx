import React,{ Component } from 'react'

import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form,Button } from 'react-bootstrap'

import MyHero from '../components/MyHero';
import MyCat from '../components/MyCat';
import MyAboutUs from '../components/MyAboutUs';

class Register extends Component{
    render(){
        return(
            <Container className="justify-content-center d-flex py-5">
                <Col lg={6}>
                    <div className="register-card">
                        <h3 className="text-center">Register</h3>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn-block">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Container>
        )
    }
}

export default Register