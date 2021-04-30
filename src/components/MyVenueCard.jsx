import React, { } from 'react'
import { Badge, Card, Container, Row, Col } from 'react-bootstrap';
import {
    useHistory
} from "react-router-dom";

import './MyVenueCard.scss'

import cat_basketball from '../assets/cat_basketball.png'
import rating from '../assets/rating_5_5.png'

const MyVenueCard = (props) => {
    let history = useHistory()

    const handleClick = () => {
        history.push('/venuedetails') 
    }

    return (
        <div>
            <Card className="venue-card" onClick={handleClick}>
                <Card.Img className="venue-image" variant="top" src={props.image} />
                <Card.ImgOverlay>
                    <Row className="d-flex justify-content-between px-3">
                        <Badge className="badge-futsal">{props.sport_type}</Badge>
                        <img src={rating} />
                    </Row>
                </Card.ImgOverlay>
                <Card.Body className="p-3">
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {props.number_of_fields} Fields
                    </Card.Subtitle>
                    <Card.Text className="text-address">
                        {props.address}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyVenueCard