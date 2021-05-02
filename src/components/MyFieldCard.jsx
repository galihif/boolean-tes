import React, { Component } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';

import './MyFieldCard.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import cat_basketball from '../assets/cat/cat_basketball.png'


class MyFieldCard extends Component{
    
    state = {
        showDialog: false
    }

    toggleDialog = () => {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }


    render(){
        return (
            <div className="field-card">
                <Card class="card">
                    <div class="card-horizontal">
                        <div class="img-square-wrapper">
                            <Card.Img variant="top" src={cat_basketball} />
                        </div>
                        <Card.Body className="p-4">
                            <Row className="d-flex justify-content-lg-between">
                                <Col lg={4}>
                                    <Card.Title>
                                        Golden Goal
                                                </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Sport : Futsal
                                                </Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Field : Indoor
                                                </Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Floor : Vinyl
                                                </Card.Subtitle>
                                </Col>
                                <Col lg={4}>
                                    <Card.Title className="align-self-start">
                                        Rp. 210.000/hour
                                                </Card.Title>
                                    <Button onClick={this.toggleDialog} className="btn-my-primary align-self-end" variant="primary" >Book</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </div>
                </Card>
                <Modal show={this.state.showDialog} onHide={this.toggleDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book a Field</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={4}><p>Field</p></Col>
                            <Col><p>Vinyl</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Date</p></Col>
                            <Col><Form.Control type="date" placeholder="Enter Date" /></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Time</p></Col>
                            <Col lg={3}><Form.Control type="time" placeholder="Enter Time" /></Col>
                            <Col lg={2}>To</Col>
                            <Col lg={3}><Form.Control type="time" placeholder="Enter Time" /></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Price</p></Col>
                            <Col><h4>Rp 120.000</h4></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleDialog}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={this.toggleDialog}>
                            Book
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default MyFieldCard