import React,{ useState } from 'react'

import './Login.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form,Button } from 'react-bootstrap'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log(email, password)
    }
    return (
            <Container className="justify-content-center d-flex py-5">
                <Col lg={6}>
                    <div className="login-card">
                        <h3 className="text-center">Login</h3>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id="email" type="email" placeholder="Enter email" onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn-block" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Container>
    )
    
}

export default Login