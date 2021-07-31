import React, { useState, useEffect } from 'react'
import firebase,{firestore, auth} from '../config/firebase'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Profile.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Col, 
    Container, 
    Row, 
    Table, 
    Form,
    Button, 
    Image,
    Tab,
    Nav,
    Modal
} from 'react-bootstrap'

const Profile = (props) => {
    let history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [showDialog, setShowDialog] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const [userName, setUserName] = useState("")
    const [userEditName, setUserEditName] = useState(userName)
    const [userPhoto, setUserPhoto] = useState()
    const [isLoading, setLoading] = useState(false)
    const [booking_data, setBookingData] = useState([])
    const [booking, setBooking] = useState({})
    const userId = props.match.params.id
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

 
    useEffect(() => {
        getProfile()
        getBooking()
        // document.title = `Profile - ${userName}`
    });

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }


    const getProfile = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // setLoading(true)
            if (user) {
                setUserName(user.displayName)
                setUserPhoto(user.photoURL)
                document.title = `Profile - ${user.displayName}`
            } else {
                // No user is signed in.
            }
            
        })
    }

    const getBooking = () => {
        const ref = firebase.firestore().collection("booking").where("userId", "==", userId)
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setBookingData(items)
        })
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                setUserEditName(e.target.value)
                break
            case "password":
                setPassword(e.target.value)
                break
            case "image":
                let file = e.target.files[0]
                break
            default:
                return null
        }
    }

    const handleSave = () => {
        auth.onAuthStateChanged((user) => {
            user.updateProfile({
                displayName: userEditName
            })
            console.log(user)
            dispatch({ type: "changeUserName", userData: user})
        })
    }

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
            dispatch({ type: "LOGOUT" })
        }).catch((error) => {
            // An error happened.
        });
    }

    const handleDetail = (booking) => {
        setShowDialog(!showDialog)
        setBooking(booking)
    }

    const cancelBooking = () => {
        setLoading(true)
        booking.isCancelled = true
        firestore.collection("booking").doc(booking.id)
            .set(booking)
            .then(() => {
                alert("Booking Canceled")
                toggleDialog()
                setLoading(false)
            }).catch((error) => {
                console.error("Error removing document: ", error);
                setLoading(false)
            })
    }
    
    return (
        <Container className="py-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} className="profile-card">
                        <Nav variant="pills" className="flex-column">
                            <Row className="px-4 mb-3">
                                <Col lg className="p-0 d-flex align-items-center justify-content-center">
                                    <Image src={userPhoto} roundedCircle />
                                </Col>
                            </Row>
                            <Row className="px-4 mb-3">
                                <Col lg className="p-0 d-flex justify-content-center">
                                    <h6 className="text-center">{userName}</h6>
                                </Col>
                            </Row>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="text-center">Booking History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="text-center">Account Settings</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className="booking-history">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Venue - Field</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                {/* <th>Booked at</th> */}
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
                                    {
                                        booking_data.length === 0 ? (
                                            <div>
                                                <Row className="d-flex justify-content-center">
                                                    <h4 className="text-center">
                                                        You have no booking activity
                                                    </h4>
                                                </Row>
                                                <Row className="d-flex justify-content-center">
                                                    <h5 className="text-center">
                                                        Go to venues to book a field
                                                    </h5>
                                                </Row>
                                            </div>
                                        ) : null
                                    }
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
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="account-settings">
                                    <Col lg={6}>
                                        <Form>
                                            {/* <Form.Group controlId="image">
                                                <Form.Label><b>Change Profile Picture</b></Form.Label>
                                                <Form.File label="Upload Image" type="file" onChange={handleChange} />
                                            </Form.Group> */}
                                            <Form.Group controlId="name">
                                                <Form.Label><b>Change Name</b></Form.Label>
                                                <Form.Control type="name" placeholder="Change Name" onChange={handleChange} value={userEditName} />
                                            </Form.Group>
                                            <Button variant="primary" type="" className="mr-3" onClick={handleSave}>Save</Button>
                                            <Button variant="danger" onClick={handleLogout}>Log Out</Button>
                                        </Form>
                                    </Col>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )

}

export default Profile