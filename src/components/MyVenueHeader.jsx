import React, { Component } from 'react'
import { Button, Jumbotron, Row, Col, Container, Card } from 'react-bootstrap';

import './MyVenueHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import rating from '../assets/rating_5_5.png'


const MyVenueHeader = (props) => {

    return (
        <div className="venue-header">
            <Card className="mx-0 mb-5">
                <Card.Img src={props.image} className="header-image"/>
                <Card.ImgOverlay className="p-5">
                    <Col lg={4}>
                        <h1>{props.name}</h1>
                        <p>
                            {props.address}
                            <br />
                            <a href="https://goo.gl/maps/zU7epfsu7uob7WEX7" target="_blank">Open in map</a>
                        </p>
                        <h6>081234567890</h6>
                        <img src={rating} />
                    </Col>
                </Card.ImgOverlay>
            </Card>
        </div>

    )
}

export default MyVenueHeader