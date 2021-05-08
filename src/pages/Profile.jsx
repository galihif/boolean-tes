import React, { useState } from 'react'

import './Profile.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Col, 
    Container, 
    Row, 
    Table, 
    Form,
    Button, 
    Image,
    Tab,
    Nav
} from 'react-bootstrap'

import cat_futsal from '../assets/cat/cat_futsal.png'


const Profile = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Container className="py-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="profile-card">
                        <Nav variant="pills" className="flex-column">
                            <Row className="px-4 mb-3">
                                <Col lg={4} className="p-0 d-flex align-items-center justify-content-center">
                                    <Image src="https://images.tokopedia.net/img/cache/500-square/product-1/2019/9/14/1992273/1992273_df1a3f99-773f-46f0-a751-aca502d65994_732_732.jpg.webp" roundedCircle />
                                </Col>
                                <Col lg={8} className="p-0 d-flex align-items-center justify-content-center">
                                    <h6>Tony Stark</h6>
                                </Col>
                            </Row>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="text-center">Booking History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="text-center">Account Settings</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className="booking-history">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Venue - Field</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Price</th>
                                                <th>Booked at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Golden Goal - Vinyl</td>
                                                <td>22/01/2021</td>
                                                <td>15:00 - 16:00</td>
                                                <td>Rp. 120.000</td>
                                                <td>19/01/2021 14:32</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Marabunta - Sinte</td>
                                                <td>22/01/2021</td>
                                                <td>15:00 - 16:00</td>
                                                <td>Rp. 120.000</td>
                                                <td>19/01/2021 14:32</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="account-settings">
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><b>Tony Stark</b></Form.Label>
                                            <Form.Control type="name" placeholder="Change name"/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><b>tony@stark.com</b></Form.Label>
                                            <Form.Control type="email" placeholder="Change email" />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label><b>Password</b></Form.Label>
                                            <Form.Control type="password" placeholder="Change Password" />
                                        </Form.Group>

                                        <Button variant="primary" type="">
                                            Save
                                        </Button>
                                    </Form>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )

}

export default Profile