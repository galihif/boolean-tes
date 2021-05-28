import React, { useEffect,useState } from 'react'
import { Button, Card, Row, Col, Modal, Form, Container, Spinner, Alert } from 'react-bootstrap';
import firebase, {firestore} from '../config/firebase'
import {
    useHistory,
    Link
} from "react-router-dom";

import './MyFieldCard.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyFieldCard = (props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState()
    const [venue, setVenue] = useState(props.venueData)
    const [fail, setFail] = useState()
    const [time1, setTime1] = useState(0)
    const [time2, setTime2] = useState(0)
    const [hours, setHours] = useState(0)
    const [date, setDate] = useState(0)
    const [userId, setUserId] = useState(0)
    const [timeNow, setTimeNow] = useState("")
    const [timeRange, setTimeRange] = useState([])
    const [time, setTime] = useState(Array.from(Array(24).keys()))
    let history = useHistory()

    useEffect(() => {
        getDateTime()
        getUser()
        if (time1 !== 0 && time2 !== 0){
            setHours(time2-time1)
        }
    }, [time1,time2,hours,date,timeRange])

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
            case "date":
                setDate(e.target.value)
                break
            default:
                return null
        }
    }

    const handleSubmit = () => {
        getDateTime()
        checkAvaibility()
        // pushBooking()
    }

    const checkAvaibility = () => {
        setTimeRange([])
        setLoading(true)
        for (let i = parseInt(time1); i < parseInt(time2); i++) {
            timeRange.push(`${i}-${i + 1}`)
        }
        firestore.collection("booking")
            .where("venueId", "==", venue.venueId)
            .where("fieldName", "==", props.fieldName)
            .where("date", "==", date)
            .where("timeRange", "array-contains-any", timeRange)
            .onSnapshot((snapshot) => {
                const items = []
                console.log(1)
                snapshot.forEach((doc) => {
                    const venue = doc.data()
                    items.push(venue)
                })
                if (items.length === 0) {
                    pushBooking()
                } else {
                    setFail(true)
                    setLoading(false)
                }
            })
    }

    const pushBooking = () => {
        let ref = firebase.firestore().collection("booking").doc()
        let bookId = ref.id
        
        firebase.firestore().collection("booking").doc(bookId).set({
            bookTime: timeNow,
            date: date,
            fieldName: props.fieldName,
            isCompleted: false,
            fieldPrice: props.fieldPrice*hours,
            time1: time1,
            time2: time2,
            timeRange: timeRange,
            userId: userId,
            venueId: venue.venueId,
            venueName: venue.venueName,
            id: bookId

        }).then(() => {
            console.log('success')
            setLoading(false)
            alert("Booking Success")
            toggleDialog()
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

    const getDateTime = () => {
        let date = new Date()
        let fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        setTimeNow(fullDate)
    }

    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // setLoading(true)
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId(0)
            }

        })
    }

    const toLogin = () => {
        history.push('/login')
    }

    return (
        <div className="field-card">
            <Card class="card">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                        <Card.Img variant="top" src={props.fieldImage} />
                    </div>
                    <Card.Body className="p-4">
                        <Row className="d-flex justify-content-lg-between">
                            <Col lg={4}>
                                <Card.Title>
                                    {props.fieldName}
                                            </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Sport : {props.sportType}
                                            </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Field : {props.fieldType}
                                            </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Floor : {props.floorType}
                                            </Card.Subtitle>
                            </Col>
                            <Col lg={4}>
                                <Card.Title className="align-self-start">
                                    Rp. {props.fieldPrice}/hour
                                            </Card.Title>
                                <Button onClick={toggleDialog} className="btn-my-primary align-self-end" variant="primary" >Book</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
            </Card>

            <Modal show={showDialog} onHide={toggleDialog}>
                {
                    userId !== 0 ? (
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>Book a Field</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    fail ? (
                                        <Alert variant="danger">
                                            Booking failed. Please choose another time
                                        </Alert>
                                    ) : null
                                }
                                <Row>
                                    <Col lg={4}><p>Field</p></Col>
                                    <Col><p>{props.fieldName}</p></Col>
                                </Row>
                                <Row>
                                    <Col lg={4}><p>Date</p></Col>
                                    <Col><Form.Control onChange={handleChange} id="date" type="date" placeholder="Enter Date" /></Col>
                                </Row>
                                <Row>
                                    <Col lg={4}><p>Time</p></Col>
                                    {/* <Col lg={3}><Form.Control onChange={handleChange} id="time1" type="time" placeholder="Enter Time" /></Col> */}
                                    <Col lg={3}>
                                        <Form.Group>
                                            <Form.Control onChange={handleChange} id="time1" as="select">
                                                {
                                                    time.map((hour) => {
                                                        return (
                                                            <option value={hour}>{hour}:00</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2}>To</Col>
                                    {/* <Col lg={3}><Form.Control onChange={handleChange} id="time2" type="time" placeholder="Enter Time" /></Col> */}
                                    <Col lg={3}>
                                        <Form.Group>
                                            <Form.Control onChange={handleChange} id="time2" as="select">
                                                {
                                                    time.map((hour) => {
                                                        return (
                                                            <option value={hour}>{hour}:00</option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4}><p>Price</p></Col>
                                    <Col><h4>Rp {hours * (props.fieldPrice)}</h4></Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={toggleDialog}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSubmit}>
                                    {
                                        loading ? (
                                            <div>Loading</div>
                                        ) : (
                                            <div>Book</div>
                                        )
                                    }
                                </Button>
                            </Modal.Footer>
                        </div>
                    ) : (
                        <Container className="">
                            <Modal.Header closeButton>
                                    <Modal.Title>
                                        You have to login to book a field
                                    </Modal.Title>
                            </Modal.Header>
                            <Row className="d-flex justify-content-center py-3">
                            </Row>
                            <Row className="d-flex justify-content-center py-3">
                                <Button onClick={toLogin} className="btn-my-primary" variant="outline-primary" >Login</Button>
                            </Row>
                        </Container>
                    )
                }
            </Modal>

        </div>
    )
}

export default MyFieldCard