import React, { useState } from 'react'
import { Col, Container, Tab, Row,Nav,Image, Card, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import './Admin.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from '../config/firebase'

const Admin = () => {
    let history = useHistory()

    return (
        <Container className="py-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="profile-card">
                        <Nav variant="pills" className="flex-column">
                            <Row className="px-4 mb-3">
                                <Col lg className="p-0 d-flex align-items-center justify-content-center">
                                    <Image roundedCircle src="https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"/>
                                </Col>
                            </Row>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="text-center">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="text-center">Venues</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className="text-center">Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" className="text-center">Bookings</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h1>Dashboard</h1>
                                <Row>
                                    <Col>
                                        <Card style={{ }}>
                                            <Card.Body>
                                                <Card.Title>Venues</Card.Title>
                                                <Card.Text>
                                                    <h1>232</h1>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ }}>
                                            <Card.Body>
                                                <Card.Title>Fields</Card.Title>
                                                <Card.Text>
                                                    <h1>532</h1>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ }}>
                                            <Card.Body>
                                                <Card.Title>Users</Card.Title>
                                                <Card.Text>
                                                    <h1>98828</h1>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ }}>
                                            <Card.Body>
                                                <Card.Title>Bookings</Card.Title>
                                                <Card.Text>
                                                    <h1>762</h1>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h1>Venues</h1>
                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h1>Users</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <h1>Bookings</h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )

}

export default Admin