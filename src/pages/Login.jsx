import React,{ Component } from 'react'

import './Login.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form,Button } from 'react-bootstrap'

import MyHero from '../components/MyHero';
import MyCat from '../components/MyCat';
import MyAboutUs from '../components/MyAboutUs';

const Login = () => {
    return (
            <Container className="justify-content-center d-flex py-5">
                <Col lg={6}>
                    <div className="login-card">
                        <h3 className="text-center">Login</h3>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
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

export default Login