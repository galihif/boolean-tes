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
                <Card.Img variant="top" src={cat_basketball} />
                <Card.ImgOverlay>
                    <Row className="d-flex justify-content-between px-3">
                        <Badge className="badge-futsal">Futsal</Badge>
                        <img src={rating} />
                    </Row>

                </Card.ImgOverlay>
                <Card.Body className="p-3">
                    <Card.Title>
                        Golden Goal
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        3 Fields
                    </Card.Subtitle>
                    <Card.Text>
                        Jl. Pogung Raya No.172, Pogung Baru, Sinduadi, Mlati, Pogung Kidul, Sinduadi,
                        Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MyVenueCard