import React, { useState } from 'react'

import './Profile.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Table } from 'react-bootstrap'


const Profile = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Container className="py-5">
            <h1>Profile</h1>
            <Row className="d-flex justify-content-center">
                <Col lg={2}>
                    <div className="profile-card">

                    </div>
                </Col>
                <Col lg={10}>
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
                </Col>
            </Row>
        </Container>
    )

}

export default Profile