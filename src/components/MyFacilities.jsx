import React, { useState,useEffect } from 'react'
import {Row, Col, Container } from 'react-bootstrap';

import { Icon } from "@iconify/react";
import toiletIcon from '@iconify-icons/fa-solid/toilet';
import showerIcon from '@iconify-icons/fa-solid/shower';
import wifiIcon from '@iconify-icons/fa-solid/wifi';
import parkingIcon from '@iconify-icons/fa-solid/parking';
import chargingStation from '@iconify-icons/fa-solid/charging-station';


import './MyFacilities.scss'
import 'bootstrap/dist/css/bootstrap.min.css';



const MyFacilities = (props) => {
    const [time, setTime] = useState({
        time1Friday: "nn:nn",
        time1Monday: "07:00",
        time1Saturday: "07:00",
        time1Sunday: "07:00",
        time1Thursday: "07:00",
        time1Tuesday: "07:00",
        time1Wednesday: "07:00",
        time2Friday: "22:00",
        time2Monday: "22:00",
        time2Saturday: "22:00",
        time2Sunday: "22:00",
        time2Thursday: "22:00",
        time2Tuesday: "22:00",
        time2Wednesday: "22:00"
    })
    useEffect(() => {
        setTime(props.venueOpenTime)
    })
    console.log(time)
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
                                    {`${time.time1Monday} - ${time.time2Monday}`}
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
                                    {`${time.time1Tuesday} - ${time.time2Tuesday}`}
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
                                    {`${time.time1Wednesday} - ${time.time2Wednesday}`}
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
                                    {`${time.time1Thursday} - ${time.time2Thursday}`}
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
                                    {`${time.time1Friday} - ${time.time2Friday}`}
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
                                    {`${time.time1Saturday} - ${time.time2Saturday}`}
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
                                    {`${time.time1Sunday} - ${time.time2Sunday}`}
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