import React, { useState, useEffect } from 'react'
import firebase from '../config/firebase'
import {useHistory} from 'react-router-dom'

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
    Nav
} from 'react-bootstrap'

const Profile = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userPhoto, setUserPhoto] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [booking_data, setBookingData] = useState([])
    const userId = props.match.params.id
    let history = useHistory()
 
    useEffect(() => {
        getProfile()
        getBooking()
    });

    const getProfile = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // setLoading(true)
            if (user) {
                setUserName(user.displayName)
                setUserPhoto(user.photoURL)
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
                setUserName(e.target.value)
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

    const handleSubmit = () => {

    }

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/login')
        }).catch((error) => {
            // An error happened.
        });
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
                                                <th>Booked at</th>
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
                                                            <td>{booking.bookTime}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="account-settings">
                                    <Form>
                                        <Form.Group controlId="image">
                                            <Form.Label><b>Change Profile Picture</b></Form.Label>
                                            <Form.File label="Upload Image" type="file" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="name">
                                            <Form.Label><b>Name</b></Form.Label>
                                            <Form.Control type="name" placeholder="Change Name" onChange={handleChange} />
                                        </Form.Group>
                                        <Button variant="primary" type="">Save</Button>
                                        <Button variant="danger" onClick={handleLogout}>Log Out</Button>
                                    </Form>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <br/>
            <br/>
        </Container>
    )

}

export default Profile