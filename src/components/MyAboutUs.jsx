import React, { } from 'react'
import {Col, Container, Row } from 'react-bootstrap'
import './MyAboutUs.scss'

const MyAboutUs = (props) => {
    return (
        <Container className="justify-content-lg-center about-container " fluid>
            <Row className="mt-5">
                <Col>
                    <h2>About Us</h2>
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                    <p>
                        Boolean is stands for 'Booking Onlen Lapangan'. You can <br/> 
                        book a sports field anywhere and anytime as you want
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default MyAboutUs