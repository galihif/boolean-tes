import React, { } from 'react'
import { Button, Jumbotron, Form, Col, Container, Row } from 'react-bootstrap';
import './MyFooter.scss'

import logo from '../assets/logo_footer.png';

const MyFooter = (props) => {
    return (
        <Container className="footer-container" fluid>
            <Row className="my-5 align-items-center">
                <Col md={4}>
                    <img src={logo} className="mx-auto d-block"/>
                </Col>
                <Col md={2}>
                    <h5 className="">Features</h5>
                    <a href="/"><p>Home</p></a>
                    <a href="/venues"><p>Venues</p></a>
                    <a href="/about"><p>About Us</p></a>
                </Col>
                <Col md={3}>
                    <h5>Contact</h5>
                    <p>
                        Jl. Yacaranda, Caturtunggal, <br/>
                        Kec. Depok, Kabupaten Sleman, <br/>
                        Daerah Istimewa Yogyakarta 55281
                    </p>
                    <p>developer@boolean.com</p>
                </Col>
                <Col className="">
                    <h6>© 2021 . All rights reserved</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default MyFooter