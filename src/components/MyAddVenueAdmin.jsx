import React, { useEffect, useState} from 'react'
import { Col, Form, Modal, Row, Nav, Image, Card, Table, Button, FormGroup, FormControl } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import firebase from '../config/firebase'
import MyFieldCard from './MyFieldCard'

const MyAddVenueAdmin = () => {
    const [showDialog, setShowDialog] = useState(false)
    const [venueName, setVenueName] = useState("")
    const [venueAddress, setVenueAddress] = useState("")
    const [venueAddressURL, setVenueAddressURL] = useState("")
    const [venuePhone, setVenuePhone] = useState("")
    const [venueSportType, setVenueSportType] = useState("")
    const [venueImageURL, setVenueImageURL] = useState()
    const [dayOpenTime, setDayOpenTime] = useState({})
    const [facilities, setFacilities] = useState([])
    const [fieldList, setFieldList] = useState([])
    const [field, setField] = useState({})
    const [bundle, setBundle] = useState()

    let history = useHistory()
    let { path, url } = useRouteMatch()

    useEffect(() => {
    }, [venueName, venueAddress, venueAddressURL, venuePhone, bundle, venueSportType])

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
        if (e.target.checked){
            facilities.push(e.target.id)
        } else {
            facilities.splice(facilities.indexOf(e.target.id),1)
        }
        console.log(facilities)
    }

    const handleChangeImage = (e) => {
        const venueImage = e.target.files[0]
        const ref = firebase.storage().ref(`venueImages/${venueName}`).put(venueImage)
        ref.on(
            "state_changed",
            snapshot => { },
            error => { console.log(error) },
            () => {
                firebase.storage()
                    .ref("venueImages")
                    .child(venueName)
                    .getDownloadURL()
                    .then(url => {
                        setVenueImageURL(url)
                        console.log("upload image success")
                    })
            }
        )
    }

    const handleSubmitVenue = () => {
        let bundle = {
            venueId: "",
            venueName: venueName,
            venueAddress: venueAddress,
            venueAddressURL: venueAddressURL,
            venuePhone: venuePhone,
            venueSportType: venueSportType,
            fieldList: fieldList,
            venueImage: venueImageURL,
            numberOfFields: fieldList.length,
            venueRating: "0.0",
        }
        console.log(bundle)
    }

    const handleChangeField = (e) => {
        field[e.target.id] = e.target.value
    }

    const handleChangeFieldType = (e) => {
        if (e.target.checked) {
            field["fieldType"] = e.target.value
        }
    }

    const handleAddField = () => {
        fieldList.push(field)
        console.log(fieldList.length)
        toggleDialog()
        setField([])
    }

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }
    return(
        <div>
            <h1 className="mb-3">Add venue</h1>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Name</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} id="venueName" type="text" placeholder="Enter Name" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Address</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} id="venueAddress" as="textarea" placeholder="Enter Name" rows="3" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Google Map URL</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} id="venueURL" type="text" placeholder="Enter URL" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Phone number</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} id="venuePhone" type="number" placeholder="Enter Phone" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Sport Type</p>
                </Col>
                <Col lg={6}>
                    <Form.Group>
                        <Form.Control onChange={handleChange} id="sportType" as="select">
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
                <Col lg={3}>
                    <p>Opening Time</p>
                </Col>
                <Col lg={6}>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Monday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Monday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Monday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Tuesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Tuesday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Tuesday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Wednesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Wednesday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Wednesday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Thursday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Thursday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Thursday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Friday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Friday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Friday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Saturday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Saturday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Saturday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Sunday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Sunday" onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Sunday" onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Facilities</p>
                </Col>
                <Col lg={6}>
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
                <Col lg={3}>
                    <p>Field List</p>
                </Col>
                <Col lg>
                    <Button variant="primary" onClick={toggleDialog}>Add Field</Button>
                    {
                        fieldList.length > 0 ? (
                            fieldList.map((field) => {
                                return(
                                    <MyFieldCard
                                        image="https://www.mecreeled.com/wp-content/uploads/2019/03/futsal-field-led-lighting.jpg"
                                        field_name={field.fieldName}
                                        sport_type={field.sportType}
                                        field_type={field.fieldType}
                                        floor_type={field.floorType}
                                        price={field.fieldPrice}
                                    />
                                )
                            })
                        ) : null
                    }
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Add Photo</p>
                </Col>
                <Col lg={6}>
                    <Form.File label="Upload Image" type="file" onChange={handleChangeImage} />
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
                                <Form.Check onChange={handleChangeFieldType} inline label="Indoor" name="group1" value="Indoor" type="radio"/>
                                <Form.Check onChange={handleChangeFieldType} inline label="Outdoor" name="group1" value="Outdoor" type="radio"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={3}><p>Sport Type</p></Col>
                        <Col>
                            <Form.Group>
                                <Form.Control onChange={handleChangeField} id="sportType" as="select">
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
                        <Col><Form.File label="Upload Image" type="file"/></Col>
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
    )
}

export default MyAddVenueAdmin