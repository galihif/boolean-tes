import React, { } from 'react'
import { Badge, Card, Container, Row, Col } from 'react-bootstrap';
import {
    useHistory
} from "react-router-dom";

import './MyVenueCard.scss'

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

const MyVenueCard = (props) => {
    let history = useHistory()

    const handleClick = () => {
        history.push(`/venuedetails/${props.venueId}`)
    }

    const getRatingIcon = (venueRating) => {
        if(venueRating >= 4.5){
            return rating45
        } else if(venueRating >= 4){
            return rating4
        
        } else if(venueRating >= 3.5){
            return rating35
        
        } else if(venueRating >= 3){
            return rating3
        
        } else if(venueRating >= 2.5){
            return rating25
        
        } else if(venueRating >= 2){
            return rating2
        
        } else if(venueRating >= 1.5){
            return rating15
        
        } else if(venueRating >= 1){
            return rating1
        
        } else if(venueRating >= 0.5){
            return rating05
        } else {
            return rating0
        }
    }

    return (
        <div>
            <Card className="venue-card" onClick={handleClick}>
                <Card.Img className="venue-image" variant="top" src={props.venueImage} />
                <Card.ImgOverlay>
                    <Row className="d-flex justify-content-between px-3">
                        <Badge className="badge-futsal">{props.venueSportType}</Badge>
                        <img src={getRatingIcon(props.venueRating)} />
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