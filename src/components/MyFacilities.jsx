import React, { Component } from 'react'
import { Button, Jumbotron, Row, Col, Container } from 'react-bootstrap';

import { Icon, InlineIcon } from "@iconify/react";
import toiletIcon from '@iconify-icons/fa-solid/toilet';
import showerIcon from '@iconify-icons/fa-solid/shower';
import wifiIcon from '@iconify-icons/fa-solid/wifi';
import parkingIcon from '@iconify-icons/fa-solid/parking';
import chargingStation from '@iconify-icons/fa-solid/charging-station';


import './MyFacilities.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import rating from '../assets/rating_5_5.png'


const MyFacilities = () => {

    return (
        <div className="facilities-container px-5 mb-3">
            <Row>
                <Col lg>
                    <Container className="schedule">
                        <h2>Opening time</h2>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Monday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Tuesday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Wednesday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Thursday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Friday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Saturday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-lg-between pr-5 mb-0">
                            <Col>
                                <p className="font-weight-bolder">
                                    Sunday
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    08.00 - 23.00
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col lg>
                    <h2>Facilities</h2>
                    <Row className="d-flex justify-content-lg-between">
                        <Col className="pr-0">
                            <Row>
                                <Col lg={2}><Icon icon={toiletIcon} className="icon"/></Col>
                                <Col lg={10}><p>Toilets</p></Col>
                            </Row>
                            <Row>
                                <Col lg={2}><Icon icon={showerIcon} className="icon"/></Col>
                                <Col lg={10}><p>Bathroom</p></Col>
                            </Row>
                            <Row>
                                <Col lg={2}><Icon icon={wifiIcon} className="icon"/></Col>
                                <Col lg={10}><p>Wifi</p></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col lg={2}><Icon icon={parkingIcon} className="icon"/></Col>
                                <Col lg={10}><p>Parking Space</p></Col>
                            </Row>
                            <Row>
                                <Col lg={2}><Icon icon={chargingStation} className="icon"/></Col>
                                <Col lg={10}><p>Charging Port</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default MyFacilities