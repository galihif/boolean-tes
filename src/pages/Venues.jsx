import React, { Component } from 'react'
import { Button, Card, Badge, Form, Container, Row, Col } from 'react-bootstrap';
import {
    useHistory
} from "react-router-dom";

import cat_basketball from '../assets/cat_basketball.png'
import rating from '../assets/rating_5_5.png'

import './Venues.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFindField from '../components/MyFindField';
import MyFilter from '../components/MyFilter';
import MyVenueCard from '../components/MyVenueCard';

class Venues extends Component {
    render() {
        return (
            <div>
                <MyFindField/>
                   
                <Container className="mt-5">
                    <Row className="justify-content-center d-flex">
                        <Col lg={2} xs={10} className="mx-xs-auto">
                            <MyFilter/>
                        </Col>
                        <Col lg={10}>
                            <Container className="list-venue-container">
                                <Row className="d-flex justify-content-left">
                                    <Col lg={4} className="px-3 mx-0 mb-3">
                                        <MyVenueCard/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Venues