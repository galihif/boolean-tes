import React, { Component } from 'react'
import { Button, Jumbotron, CardDeck, Form, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFindField.scss'
import MyButton from '../atom/MyButton';

class MyFindField extends Component {
    render() {
        return (
            <Jumbotron className="find-container pl-lg-5">
                <Container className="">
                    <Row>
                        <h1 className="">
                            Find Your Favourite Venues
                        </h1>  
                    </Row>
                    <Row className="search-venues justify-content-left justify-content-xs-center">
                        <Col lg={3} className="p-0 mr-3">
                            <Form.Control type="email" placeholder="Where do you want to play?" className="search-form" />
                        </Col>
                        <Col lg={3} className="p-0 align-items-center">
                            <Button className="btn-my-primary mx-auto align-self-center" variant="primary" >Search</Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}

export default MyFindField