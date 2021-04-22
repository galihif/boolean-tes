import React, { } from 'react'
import { CardDeck, Card, Container, Row, Col } from 'react-bootstrap';
import MyButton from '../atom/MyButton';
import './MyCat.scss'

import cat_futsal from '../assets/cat_futsal.png'
import cat_volley from '../assets/cat_volley.png'
import cat_basketball from '../assets/cat_basketball.png'
import cat_badminton from '../assets/cat_badminton.png'
import cat_tennis from '../assets/cat_tennis.png'

const MyCat = () => {
    return (
        <div className="cat-container">
            <h2>Categories</h2>
            <CardDeck className="my-card-deck1">
                <Container>
                    <Row className="justify-content-md-center my-lg-4">
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            
                    <Row className="justify-content-md-center my-lg-4">
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} xs={8} className="mx-lg-0 mx-auto my-2">
                            <Card className="my-card">
                                <Card.Img variant="top" src={cat_futsal} />
                                <Card.Body className="my-card-body">
                                    <Card.Text>
                                        Futsal
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