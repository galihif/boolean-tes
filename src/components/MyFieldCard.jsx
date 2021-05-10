import React, { useEffect,useState } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';

import './MyFieldCard.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyFieldCard = (props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [time1, setTime1] = useState(0)
    const [time2, setTime2] = useState(0)
    const [hours, setHours] = useState(0)
    const [venueData, setVenueData] = useState(props.venue_data)

    useEffect(() => {
        console.log(time1, time2)
        if (time1 !== 0 && time2 !== 0){
            var array1 = time1.split(":");
            var seconds1 = (parseInt(array1[0], 10) * 60 * 60) + (parseInt(array1[1], 10) * 60)


            var array2 = time2.split(":");
            var seconds2 = (parseInt(array2[0], 10) * 60 * 60) + (parseInt(array2[1], 10) * 60)

            setHours(Math.ceil((seconds2 - seconds1) / 3600))
        }
    }, [time1,time2,hours])

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "time1":
                setTime1(e.target.value)
                break
            case "time2":
                setTime2(e.target.value)
                break
            default:
                return null
        }
    }

    const handleSubmit = () => {
        console.log(venueData)
    }

    return (
        <div className="field-card">
            <Card class="card">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                        <Card.Img variant="top" src={props.image} />
                    </div>
                    <Card.Body className="p-4">
                        <Row className="d-flex justify-content-lg-between">
                            <Col lg={4}>
                                <Card.Title>
                                    {props.field_name}
                                            </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Sport : {props.sport_type}
                                            </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Field : {props.field_type}
                                            </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Floor : {props.floor_type}
                                            </Card.Subtitle>
                            </Col>
                            <Col lg={4}>
                                <Card.Title className="align-self-start">
                                    Rp. {props.price}/hour
                                            </Card.Title>
                                <Button onClick={toggleDialog} className="btn-my-primary align-self-end" variant="primary" >Book</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
            </Card>

            <Modal show={showDialog} onHide={toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Book a Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={4}><p>Field</p></Col>
                        <Col><p>{props.field_name}</p></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p>Date</p></Col>
                        <Col><Form.Control id="date" type="date" placeholder="Enter Date" /></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p>Time</p></Col>
                        <Col lg={3}><Form.Control onChange={handleChange} id="time1" type="time" placeholder="Enter Time" /></Col>
                        <Col lg={2}>To</Col>
                        <Col lg={3}><Form.Control onChange={handleChange} id="time2" type="time" placeholder="Enter Time" /></Col>
                    </Row>
                    <Row>
                        <Col lg={4}><p>Price</p></Col>
                        <Col><h4>Rp {hours*(props.price)}</h4></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default MyFieldCard