import React,{useState,useEffect} from 'react'
import { Modal, Container, Tab, Row, Nav, Image, Col, Table, Button } from 'react-bootstrap'
import firebase, { firestore } from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const BookingVenueDashboard = (props) => {

    let history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [showDialog, setShowDialog] = useState(false)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [userId, setUserId] = useState(props.userId)
    const [isLoading, setLoading] = useState(false)
    const [booking_data, setBookingData] = useState([])
    const [booking, setBooking] = useState({})

    useEffect(() => {
        getBooking()
    });

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }

    const getBooking = () => {
        const ref = firebase.firestore().collection("booking").where("venueId", "==", userId)
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setBookingData(items)
        })
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
            <div className="booking-history">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Venue - Field</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            {/* <th>Booked at</th> */}
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking_data.map((booking) => {
                                return (
                                    <tr>
                                        <td>{booking.venueName} - {booking.fieldName}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.time1}:00 - {booking.time2}:00</td>
                                        <td>Rp. {booking.fieldPrice}</td>
                                        {/* <td>{booking.bookTime}</td> */}
                                        <td>
                                            <Button variant="primary" className="btn-detail" onClick={() => handleDetail(booking)}>Detail</Button>
                                        </td>
                                    </tr>
                                )
                            })
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
        </div>
    )
}

export default BookingVenueDashboard