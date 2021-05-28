import React, { useState,useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';


import { Icon } from "@iconify/react";
import toiletIcon from '@iconify-icons/fa-solid/toilet';
import showerIcon from '@iconify-icons/fa-solid/shower';
import wifiIcon from '@iconify-icons/fa-solid/wifi';
import parkingIcon from '@iconify-icons/fa-solid/parking';
import chargingStation from '@iconify-icons/fa-solid/charging-station';
import futbolIcon from '@iconify-icons/fa-solid/futbol';


import './MyFacilities.scss'
import 'bootstrap/dist/css/bootstrap.min.css';



const MyFacilities = (props) => {
    const [fac, setFac] = useState(["toilets","bathroom"])
    const [time, setTime] = useState({
        time1Friday: "n",
        time1Monday: "07",
        time1Saturday: "07",
        time1Sunday: "07",
        time1Thursday: "07",
        time1Tuesday: "07",
        time1Wednesday: "07",
        time2Friday: "22",
        time2Monday: "22",
        time2Saturday: "22",
        time2Sunday: "22",
        time2Thursday: "22",
        time2Tuesday: "22",
        time2Wednesday: "22"
    })
    useEffect(() => {
        setTime(props.venueOpenTime)
        setFac(props.venueFacilities)
    })

    const getIcon = (id) => {
        switch(id){
            case "wifi":
                return wifiIcon
                break
            case "parking":
                return parkingIcon
                break
            case "charging":
                return chargingStation
                break
            case "toilets":
                return toiletIcon
                break
            case "shoesRent":
                return futbolIcon
                break
            case "bathroom":
                return showerIcon
                break
            default:
                break
        }
    }
    const getDesc = (id) => {
        switch(id){
            case "wifi":
                return "Free Wi-Fi"
                break
            case "parking":
                return "Parking Space"
                break
            case "charging":
                return "Charging Port"
                break
            case "toilets":
                return "Toilet"
                break
            case "shoesRent":
                return "Shoes Rental"
                break
            case "bathroom":
                return "Bathroom"
                break
            default:
                break
        }
    }
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
                                    {`${time.time1Monday}:00 - ${time.time2Monday}:00`}
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
                                    {`${time.time1Tuesday}:00 - ${time.time2Tuesday}:00`}
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
                                    {`${time.time1Wednesday}:00 - ${time.time2Wednesday}:00`}
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
                                    {`${time.time1Thursday}:00 - ${time.time2Thursday}:00`}
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
                                    {`${time.time1Friday}:00 - ${time.time2Friday}:00`}
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
                                    {`${time.time1Saturday}:00 - ${time.time2Saturday}:00`}
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
                                    {`${time.time1Sunday}:00 - ${time.time2Sunday}:00`}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col lg>
                    <h2>Facilities</h2>
                    <Row className="d-flex justify-content-lg-between">
                        {
                            fac.map((fac) => {
                                return (
                                    <Col lg={6} className="pr-0 mb-3">
                                        <Row>
                                            <Col lg={2}><Icon icon={getIcon(fac)} className="icon" /></Col>
                                            <Col lg={10}><p className="">{getDesc(fac)}</p></Col>
                                        </Row>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default MyFacilities