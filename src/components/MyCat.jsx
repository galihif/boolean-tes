import React, { } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import './MyCat.scss'
import { CardDeck, Card, Container, Row, Col } from 'react-bootstrap';

import cat_futsal from '../assets/cat/cat_futsal.png'
import cat_badminton from '../assets/cat/cat_badminton.png'
import cat_basketball from '../assets/cat/cat_basketball.png'
import cat_tennis from '../assets/cat/cat_tennis.png'
import cat_volley from '../assets/cat/cat_volley.png'

const MyCat = (e) => {
    let history = useHistory()

    const handleClick = (e) => {
        history.push(`/venues/cat/${e.currentTarget.id}`)
    }
    return (
        <div className="cat-container">
            <h2>Categories</h2>
            <CardDeck className="my-card-deck1">
                <Container>
                    <Row className="justify-content-md-center my-lg-4">
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card" onClick={(e) => handleClick(e)} id="Badminton">
                                <Card.Img variant="top" src={cat_badminton} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Badminton
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card" onClick={(e) => handleClick(e)} id="Futsal">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card" onClick={(e) => handleClick(e)} id="Basket">
                                <Card.Img variant="top" src={cat_basketball} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Basketball
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            
                    <Row className="justify-content-md-center my-lg-4">
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card" onClick={(e) => handleClick(e)} id="Tennis">
                                <Card.Img variant="top" src={cat_tennis} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Tennis
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card" onClick={(e) => handleClick(e)} id="Volley">
                                <Card.Img variant="top" src={cat_volley} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Volley
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            
                </Container>
            </CardDeck>

            
        </div>

    )
}

export default MyCat