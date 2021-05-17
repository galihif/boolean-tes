import React, { } from 'react'
import { Badge, Card, Container, Row, Col } from 'react-bootstrap';
import {
    useHistory
} from "react-router-dom";

import './MyVenueCard.scss'

import rating5 from '../assets/rating/rating5.png'

const MyVenueCard = (props) => {
    let history = useHistory()

    const handleClick = () => {
        history.push(`/venuedetails/${props.venueId}`)
    }

    return (
        <div>
            <Card className="venue-card" onClick={handleClick}>
                <Card.Img className="venue-image" variant="top" src={props.venueImage} />
                <Card.ImgOverlay>
                    <Row className="d-flex justify-content-between px-3">
                        <Badge className="badge-futsal">{props.venueSportType}</Badge>
                        <img src={rating5} />
                    </Row>
                </Card.ImgOverlay>
                <Card.Body className="p-3">
                    <Card.Title>
                        {props.venueName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {props.numberOfFields} Fields
                    </Card.Subtitle>
                    <Card.Text className="text-address">
                        {props.venueAddress}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyVenueCard