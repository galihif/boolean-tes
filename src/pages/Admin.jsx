import React, { useState, useEffect } from 'react'
import { Switch, useHistory, useRouteMatch, Route, Link } from 'react-router-dom'
import firebase, { auth } from '../config/firebase'
import { useSelector, useDispatch } from 'react-redux'

import './Admin.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'

import MyVenuesAdmin from '../components/MyVenuesAdmin';
import MyDashboardAdmin from '../components/MyDashboardAdmin';
import MyAddVenueAdmin from '../components/MyAddVenueAdmin';
import MyEditVenueAdmin from '../components/MyEditVenueAdmin';

import stop_admin from '../assets/stop_admin.jpg'
import MyUserAdmin from '../components/MyUserAdmin';
import MyBookingAdmin from '../components/MyBookingAdmin';

const Admin = () => {
    const [adminStatus, setAdminStatus] = useState(false)
    let history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    let {path, url} = useRouteMatch()

    useEffect(() => {
        getUser()
    })

    const getUser = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if(user.email === 'admin@boolean.com'){
                    setAdminStatus(true)
                }
            } else {
                
            }
        })
    }

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
            dispatch({ type: "LOGOUT" })
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            {
                adminStatus ? (
                    <div>
                        <Container className="py-5">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                    <Col sm={2} className="profile-card">
                                        <Nav variant="pills" className="flex-column">
                                            <Row className="px-4 mb-3 d-flex justify-content-center">
                                                <Col lg className="p-0 d-flex align-items-center justify-content-center">
                                                    <Image roundedCircle src="https://spesialis1.orthopaedi.fk.unair.ac.id/wp-content/uploads/2021/02/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg" />
                                                </Col>
                                                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
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
                                                <MyDashboardAdmin />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Switch>
                                                    <Route path={`${path}/add-venue`}>
                                                        <MyAddVenueAdmin />
                                                    </Route>
                                                    <Route path={`${path}/edit-venue/:id`}>
                                                        <MyEditVenueAdmin/>
                                                    </Route>
                                                    <Route path={path}>
                                                        <MyVenuesAdmin />
                                                    </Route>
                                                </Switch>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <h1>Users</h1>
                                                <MyUserAdmin/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="fourth">
                                                <h1>Bookings</h1>
                                                <MyBookingAdmin/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Container>
                    </div>
                ) : (
                    <Container>
                        <Row className="d-flex justify-content-center">
                            <h1>Stop! Restricted Area</h1>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Image src={stop_admin} rounded />
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <h3>This area only can be accessed by admin</h3>
                        </Row>
                    </Container>
                )
            }
        </div>
    )

}

export default Admin