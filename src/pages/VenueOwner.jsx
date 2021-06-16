import React, { useState, useEffect } from 'react'
import firebase,{firestore} from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
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
import BookingVenueDashboard from '../components/BookingVenueDashboard'
import VenueInfo from '../components/VenueInfo'

const VenueOwner = (props) => {
    let history = useHistory()
    let {id} = useParams()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [showDialog, setShowDialog] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState(id)
    const [userPhoto, setUserPhoto] = useState("https://www.pngfind.com/pngs/m/3-37689_basketball-orange-rubber-sphere-ball-sport-game-basketball.png")
    const [isLoading, setLoading] = useState(false)
    const [booking_data, setBookingData] = useState([])
    const [booking, setBooking] = useState({})
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
 
    useEffect(() => {
        getProfile()
        getBooking()
    });

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }


    const getProfile = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // setLoading(true)
            if (user) {
                setUserName(user.displayName)
            } else {
                // No user is signed in.
            }
            
        })
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
                                <Nav.Link eventKey="first" className="text-center">Venue</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="text-center">Booking List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className="text-center">Account Settings</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={10} className="px-2">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <VenueInfo userId={userId}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <BookingVenueDashboard userId={userId}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
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
        </Container>
    )

}

export default VenueOwner