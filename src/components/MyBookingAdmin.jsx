import React,{useState,useEffect} from 'react'
import { Modal, Container, Col, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import firebase,{firestore} from '../config/firebase'

const MyBookingAdmin = () => {
    const [bookings, setBookings] = useState([])
    const [booking, setBooking] = useState({})
    const [bookId, setBookId] = useState("")
    const [showDialog, setShowDialog] = useState(false)
    const [isLoading, setLoading] = useState(false)
    let history = useHistory()
    let { path, url } = useRouteMatch()

    useEffect(() => {
        getVenues()
    })

    const getVenues = () => {
        const ref = firebase.firestore().collection("booking")
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setBookings(items)
        })
    }

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
    }

    
    const toggleDialog = (id) => {
        setShowDialog(!showDialog)
        setBookId(id)
    }
    
    const handleDetail = (booking) => {
        setShowDialog(!showDialog)
        setBooking(booking)
    }

    const cancelBooking = () => {
        setLoading(true)
        firestore.collection("booking").doc(booking.id)
            .delete()
            .then(() => {
                alert("Booking Canceled")
                setShowDialog(!showDialog)
                setLoading(false)
            }).catch((error) => {
                console.error("Error removing document: ", error);
                setLoading(false)
            })
    }
    
    return(
        <div>
            <div className="venues-table">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Venue - Field</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 ? (
                                bookings.map((booking) => {
                                    return(
                                        <tr>
                                            <td>{booking.id}</td>
                                            <td>{booking.userId}</td>
                                            <td>{booking.venueName} - {booking.fieldName}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.time1}:00 - {booking.time2}:00</td><td>
                                                <Button variant="primary" className="btn-detail" onClick={() => handleDetail(booking)}>Detail</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : null
                        }
                    </tbody>
                </Table>
                <Modal show={showDialog} onHide={toggleDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={4}><p>Booking ID</p></Col>
                            <Col><p>{booking.id}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>User ID</p></Col>
                            <Col><p>{booking.userId}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Venue ID</p></Col>
                            <Col><p>{booking.venueId}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Booked at</p></Col>
                            <Col><p>{booking.bookTime}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Venue</p></Col>
                            <Col><p>{booking.venueName}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Field</p></Col>
                            <Col><p>{booking.fieldName}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Date</p></Col>
                            <Col><p>{booking.date}</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Time</p></Col>
                            <Col><p>{booking.time1}:00 - {booking.time2}:00</p></Col>
                        </Row>
                        <Row>
                            <Col lg={4}><p>Total Price</p></Col>
                            <Col><p>{booking.fieldPrice}</p></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelBooking}>
                            {
                                isLoading ? (
                                    <div>Loading</div>
                                ) : <div>Cancel Booking</div>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <br />
            <br />
        </div>
    )
}

export default MyBookingAdmin