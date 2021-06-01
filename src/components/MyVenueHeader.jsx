import React, { Component } from 'react'
import { Button, Jumbotron, Row, Col, Container, Card } from 'react-bootstrap';

import './MyVenueHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import rating5 from '../assets/rating/rating5.png'
import rating45 from '../assets/rating/rating45.png'
import rating4 from '../assets/rating/rating4.png'
import rating35 from '../assets/rating/rating35.png'
import rating3 from '../assets/rating/rating3.png'
import rating25 from '../assets/rating/rating25.png'
import rating2 from '../assets/rating/rating2.png'
import rating15 from '../assets/rating/rating15.png'
import rating1 from '../assets/rating/rating1.png'
import rating05 from '../assets/rating/rating05.png'
import rating0 from '../assets/rating/rating0.png'

const MyVenueHeader = (props) => {

    const getRatingIcon = (venueRating) => {
        if (venueRating >= 4.5) {
            return rating45
        } else if (venueRating >= 4) {
            return rating4

        } else if (venueRating >= 3.5) {
            return rating35

        } else if (venueRating >= 3) {
            return rating3

        } else if (venueRating >= 2.5) {
            return rating25

        } else if (venueRating >= 2) {
            return rating2

        } else if (venueRating >= 1.5) {
            return rating15

        } else if (venueRating >= 1) {
            return rating1

        } else if (venueRating >= 0.5) {
            return rating05
        } else {
            return rating0
        }
    }


    return (
        <div className="venue-header">
            <Card className="mx-0 mb-5">
                <Card.Img src={props.image} className="header-image"/>
                <Card.ImgOverlay className="px-5">
                    <Col lg={4}>
                        <h1>{props.name}</h1>
                        <p>
                            {props.address}
                            <br />
                            <a href={props.addressURL} target="_blank">Open in map</a>
                        </p>
                        <h6>{props.phone}</h6>
                        <img src={getRatingIcon(props.venueRating)} />
                    </Col>
                </Card.ImgOverlay>
            </Card>
        </div>

    )
}

export default MyVenueHeader