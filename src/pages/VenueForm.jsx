import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row, Nav, Image, Card, Table, Button, FormGroup, FormControl, Container } from 'react-bootstrap'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'
import firebase, { storage, firestore } from '../config/firebase'
import { useSelector, useDispatch } from 'react-redux'
import MyFieldCardAdmin from '../components/MyFieldCardAdmin'

import './VenueForm.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


const VenueForm = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const state = useSelector((state) => state)
    const [showDialog, setShowDialog] = useState(false)
    const [venueId, setVenueId] = useState(id)
    const [venueName, setVenueName] = useState("")
    const [venueAddress, setVenueAddress] = useState("")
    const [venueAddressURL, setVenueAddressURL] = useState("")
    const [venueEmbedURL, setVenueEmbedURL] = useState("")
    const [venueRating, setVenueRating] = useState(0)
    const [venuePhone, setVenuePhone] = useState("")
    const [venueSportType, setVenueSportType] = useState("")
    const [venueImageURL, setVenueImageURL] = useState()
    const [dayOpenTime, setDayOpenTime] = useState({})
    const [facilities, setFacilities] = useState([])
    const [fieldList, setFieldList] = useState([])
    const [fieldFloorTypeSearch, setFieldFloorTypeSearch] = useState([])
    const [field, setField] = useState({})
    const [fieldImageURL, setFieldImageURL] = useState()
    const [bundle, setBundle] = useState()
    const [time, setTime] = useState(Array.from(Array(24).keys()))
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    let history = useHistory()
    let { path, url } = useRouteMatch()


    useEffect(() => {
        document.title = "Fill Venue Data"   
    })

    const handleChange = (e) => {
        switch (e.target.id) {
            case "venueName":
                setVenueName(e.target.value)
                break
            case "venueAddress":
                setVenueAddress(e.target.value)
                break
            case "venueURL":
                setVenueAddressURL(e.target.value)
                break
            case "venueEmbedURL":
                setVenueEmbedURL(e.target.value)
                break
            case "venueRating":
                setVenueRating(e.target.value)
                break
            case "venuePhone":
                setVenuePhone(e.target.value)
                break
            case "sportType":
                setVenueSportType(e.target.value)
                break
            default:
                break
        }
    }

    const handelOpenTimeChange = (e) => {
        dayOpenTime[e.target.id] = e.target.value
    }

    const handleChangeFacilities = (e) => {
        if (e.target.checked) {
            facilities.push(e.target.id)
        } else {
            facilities.splice(facilities.indexOf(e.target.id), 1)
        }
    }

    const handleChangeVenueImage = (e) => {
        const venueImage = e.target.files[0]
        const uploadImage = storage.ref(`venueImage/${venueId}/${venueName}`).put(venueImage)
        uploadImage.on(
            "state_changed",
            snapshot => { },
            error => { console.log(error) },
            () => {
                storage
                    .ref(`venueImage/${venueId}`)
                    .child(venueName)
                    .getDownloadURL()
                    .then(imageURL => {
                        setVenueImageURL(imageURL)
                        console.log(imageURL)
                    })
            }
        )
    }

    const handleSubmitVenue = () => {
        const time = new Date()
        let bundle = {
            venueId: venueId,
            venueName: venueName,
            venueAddress: venueAddress,
            venueAddressURL: venueAddressURL,
            venueEmbedURL: venueEmbedURL,
            venueRating: venueRating,
            venuePhone: venuePhone,
            venueSportType: venueSportType,
            venueOpenTime: dayOpenTime,
            venueFacilities: facilities,
            fieldList: fieldList,
            fieldFloorTypeSearch: fieldFloorTypeSearch,
            venueImage: venueImageURL,
            numberOfFields: fieldList.length,
            joinedAt: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        }
        pushVenue(bundle)
        history.push(`/venuedashboard/${venueId}`)
    }

    const pushVenue = (bundle) => {
        firebase.firestore().collection("venues").doc(venueId).set(bundle)
        dispatch({type:"setVenueData", venueData:bundle})
    }

    const handleChangeField = (e) => {
        field[e.target.id] = e.target.value
        if (e.target.id === "floorType") {
            fieldFloorTypeSearch.push(e.target.value)
        }
    }

    const handleChangeFieldType = (e) => {
        if (e.target.checked) {
            field["fieldType"] = e.target.value
        }
    }

    const handleChangeFieldImage = (e) => {
        const fieldImage = e.target.files[0]
        const uploadImage = storage.ref(`venueImage/${venueId}/${field.fieldName}`).put(fieldImage)
        uploadImage.on(
            "state_changed",
            snapshot => { },
            error => { console.log(error) },
            () => {
                storage
                    .ref(`venueImage/${venueId}`)
                    .child(field.fieldName)
                    .getDownloadURL()
                    .then(imageURL => {
                        field["fieldImage"] = imageURL
                        setFieldImageURL(imageURL)
                    })
            }
        )
    }

    const handleAddField = () => {
        fieldList.push(field)
        console.log(field)
        toggleDialog()
        setField({})
    }

    const handleDeleteField = (index) => {
        fieldList.splice(index, 1)
        forceUpdate()
    }

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }
    return(
        <Container className="justify-content-center d-flex py-5">
            <Col lg={8}>
                <div className="register-card">
                    <h3 className="text-center">Fill Venue Data</h3>
                    <div className="my-5">
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Name</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venueName" type="text" placeholder="Enter Name" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Address</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venueAddress" as="textarea" placeholder="Enter Name" rows="3" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Google Map URL</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venueURL" type="text" placeholder="Enter URL" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Embed Map URL</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venueEmbedURL" type="text" placeholder="Enter URL" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Rating</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venueRating" type="number" step="0.5" placeholder="Enter Rating" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Phone number</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Control onChange={handleChange} id="venuePhone" type="number" placeholder="Enter Phone" />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Sport Type</p>
                            </Col>
                            <Col lg={8}>
                                <Form.Group>
                                    <Form.Control onChange={handleChange} id="sportType" as="select">
                                        <option hidden>Select sport</option>
                                        <option>Futsal</option>
                                        <option>Basket</option>
                                        <option>Volley</option>
                                        <option>Tennis</option>
                                        <option>Badminton</option>
                                        <option>Mix</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Opening Time</p>
                            </Col>
                            <Col lg={6}>
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Monday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Monday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Monday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Tuesday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Tuesday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Tuesday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Wednesday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Wednesday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Wednesday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Thursday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Thursday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Thursday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Friday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Friday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Friday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Saturday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Saturday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Saturday" as="select">
                                                <option hidden>Close time</option>
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
                                <Row className="my-1">
                                    <Col lg={3}>
                                        <p>Sunday</p>
                                    </Col>
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time1Sunday" as="select">
                                                <option hidden>Open time</option>
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
                                    <Col lg>
                                        <Form.Group>
                                            <Form.Control onChange={handelOpenTimeChange} id="time2Sunday" as="select">
                                                <option hidden>Close time</option>
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
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Facilities</p>
                            </Col>
                            <Col lg={8}>
                                <Row className="my-1">
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="wifi" type="checkbox" label="Wi-Fi" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="toilets" type="checkbox" label="Toilets" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="parking" type="checkbox" label="Parking" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="bathroom" type="checkbox" label="Bathroom" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="charging" type="checkbox" label="Charging Station" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Check onChange={handleChangeFacilities} id="shoesRent" type="checkbox" label="Shoes Rent" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Field List</p>
                            </Col>
                            <Col lg>
                                <Button variant="primary" onClick={toggleDialog}>Add Field</Button>
                                {
                                    fieldList.length > 0 ? (
                                        fieldList.map((field, key) => {
                                            return (
                                                <div>
                                                    <MyFieldCardAdmin
                                                        fieldImage={fieldImageURL}
                                                        fieldName={field.fieldName}
                                                        sportType={field.sportType}
                                                        fieldType={field.fieldType}
                                                        floorType={field.floorType}
                                                        fieldPrice={field.fieldPrice}
                                                    />
                                                    <Button variant="primary" onClick={() => handleDeleteField(key)}>Delete</Button>
                                                </div>
                                            )
                                        })
                                    ) : null
                                }
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={4}>
                                <p>Add Photo</p>
                            </Col>
                            <Col lg={8}>
                                <Form.File label="Upload Image" type="file" onChange={handleChangeVenueImage} />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col lg={6}>
                                <Button variant="primary" onClick={handleSubmitVenue}>Add Venue</Button>
                            </Col>
                        </Row>
                        <Modal show={showDialog} onHide={toggleDialog}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add a Field</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className="mb-2">
                                    <Col lg={3}><p>Field name</p></Col>
                                    <Col><Form.Control onChange={handleChangeField} id="fieldName" type="text" placeholder="Enter Name" /></Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={3}><p>Field Type</p></Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Check onChange={handleChangeFieldType} inline label="Indoor" name="group1" value="Indoor" type="radio" />
                                            <Form.Check onChange={handleChangeFieldType} inline label="Outdoor" name="group1" value="Outdoor" type="radio" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={3}><p>Sport Type</p></Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control onChange={handleChangeField} id="sportType" as="select">
                                                <option hidden>Select sport type</option>
                                                <option>Futsal</option>
                                                <option>Basket</option>
                                                <option>Volley</option>
                                                <option>Tennis</option>
                                                <option>Badminton</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={3}><p>Floor Type</p></Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control onChange={handleChangeField} id="floorType" as="select">
                                                <option hidden>Select floor type</option>
                                                <option>Vinyl</option>
                                                <option>Synthetic Grass</option>
                                                <option>Cement</option>
                                                <option>Parquette</option>
                                                <option>Taraflex</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}><p>Price (Rp)</p></Col>
                                    <Col><Form.Control onChange={handleChangeField} id="fieldPrice" type="number" placeholder="Enter Name" /></Col>
                                </Row>
                                <Row>
                                    <Col lg={3}><p>Photo</p></Col>
                                    <Col><Form.File label="Upload Image" type="file" onChange={handleChangeFieldImage} /></Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={toggleDialog}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleAddField}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </Col>
        </Container>
    )
}

export default VenueForm