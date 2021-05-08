import React,{ useState } from 'react'

import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form,Button } from 'react-bootstrap'

import MyHero from '../components/MyHero';
import MyCat from '../components/MyCat';
import MyAboutUs from '../components/MyAboutUs';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
        console.log(name,email, password)
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
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button onClick={handleSubmit} variant="primary" type="" className="btn-block">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Col>
        </Container>
    )
}

export default Register