import React from 'react'
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'

const MyDashboardAdmin = () => {
    return(
        <div>

            <h1>Dashboard</h1>
            <Row>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Venues</Card.Title>
                            <Card.Text>
                                <h1>232</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Fields</Card.Title>
                            <Card.Text>
                                <h1>532</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                <h1>98828</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Bookings</Card.Title>
                            <Card.Text>
                                <h1>762</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyDashboardAdmin