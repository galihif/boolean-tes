import React, { } from 'react'
import { Button, Jumbotron, Form, Col, Container, Row } from 'react-bootstrap';
import MyButton from '../atom/MyButton';
import './MyHero.scss'

const MyHero = (props) => {
    return (
        <Jumbotron className="hero-container">
            <br/>
            <br/>
            <Container className="tagline-container justify-content-lg-start justify-content-sm-center ml-lg-5 mt-lg-5">
                <Row className="my-3">
                    <Col>
                        <h1>
                            Explore Your <br /> 
                            Favourite Venues
                        </h1>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                       <Form.Row className="search-venues">
                            <Form.Control type="email" placeholder="Where do you want to play?" className="search-form" />
                            <MyButton title="Search" type="btn-my-primary"/>
                        </Form.Row> 
                    </Col>
                </Row>
            </Container>

        </Jumbotron>
    )
}

export default MyHero