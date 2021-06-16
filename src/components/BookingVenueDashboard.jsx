import React,{useState,useEffect} from 'react'
import { Modal, Container, Tab, Row, Nav, Form, Col, Table, Button } from 'react-bootstrap'
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
    const [venueData, setVenueData] = useState(state.venueData)
    const [fieldList, setFieldList] = useState(venueData.fieldList)
    const [fieldSelected, setFieldSelected] = useState("")
    const [searchId, setSearchId] = useState("")
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
        let ref =  firebase.firestore().collection("booking").where("venueId", "==", userId)
        if(fieldSelected !== ""){
            ref = ref.where("fieldName","==", fieldSelected)
        } else if(searchId !== ""){
            ref = ref.where("id", "==", searchId)
        }
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

    const handleChange = (e) => {
        if(e.target.value === "All Field"){
            setFieldSelected("")
        } else{
            setFieldSelected(e.target.value)
        }
    }

    const handleChangeId = (e) => {
        setSearchId(e.target.value)
    }

    const handleSearchId = () => {
        getBooking()
    }

    const cancelBooking = () => {
        setLoading(true)
        booking.isCancelled = true
        firestore.collection("booking").doc(booking.id)
            .set(booking)
            .then(() => {
                alert("Booking Canceled")
                setShowDialog(!showDialog)
                setLoading(false)
            }).catch((error) => {
                console.error("Error removing document: ", error);
                setLoading(false)
            })
    }

    const completeBooking = () => {
        setLoading(true)
        booking.isCompleted = true
        firestore.collection("booking").doc(booking.id)
            .set(booking)
            .then(() => {
                alert("Booking Completed")
                toggleDialog()
                setLoading(false)
            }).catch((error) => {
                console.error("Error removing document: ", error);
                setLoading(false)
            })
    }
    
    return(
        <div>
            <div className="booking-history">
                <div>
                    <Row className="p-0 justify-content-lg-between m-0">
                        <Col lg={6}>
                            <Row className="p-0">
                                <Col lg={6} className="p-0">
                                    <Form.Control onChange={handleChangeId} type="text" id="searchKeyword" placeholder="Search Booking ID" className="search-form" />
                                </Col>
                                <Col lg={4} className="p-0 mx-2">
                                    <Button onClick={handleSearchId} className="align-self-center" variant="primary" >Search</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3} className="p-0">
                            <Form.Group>
                                <Form.Control onChange={handleChange} id="sportType" as="select">
                                    <option>All Field</option>
                                    {
                                        fieldList.map((field) => {
                                            return (
                                                <option>{field.fieldName}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Table striped bordered hover className="p-0">
                        <thead>
                            <tr>
                                <th>Venue - Field</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                booking_data.map((booking) => {
                                    return(
                                        <tr>
                                            <td>{booking.venueName} - {booking.fieldName}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.time1}:00 - {booking.time2}:00</td>
                                            <td>Rp. {booking.fieldPrice}</td>
                                            <td>
                                                {
                                                    booking.isCancelled ? (
                                                        <p className="text-danger"><b>Cancelled</b></p>
                                                    ) : booking.isCompleted ? (
                                                        <p className="text-info"><b>Completed</b></p>
                                                    ) : <p className="text-dark">Not Completed</p>
                                                }
                                            </td>
                                            <td>
                                                <Button variant="primary" className="btn-detail" onClick={() => handleDetail(booking)}>Detail</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
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
                            <Col lg={4}><p>Customer Name</p></Col>
                            <Col><p>{booking.customerName}</p></Col>
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
                        <Button variant="primary" onClick={completeBooking}>
                            {
                                isLoading ? (
                                    <div>Loading</div>
                                ) : <div>Complete Booking</div>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default BookingVenueDashboard