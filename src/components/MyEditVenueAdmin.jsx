import React, { useEffect, useState} from 'react'
import { Col, Form, Modal, Row, Nav, Image, Card, Table, Button, FormGroup, FormControl } from 'react-bootstrap'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'
import firebase,{storage,firestore} from '../config/firebase'
import MyFieldCard from './MyFieldCard'
import MyFieldCardAdmin from './MyFieldCardAdmin'

const MyEditVenueAdmin = (props) => {
    let { id } = useParams()
    const [showDialog, setShowDialog] = useState(false)
    const [venueId, setVenueId] = useState(id)
    const [venueName, setVenueName] = useState("")
    const [venueAddress, setVenueAddress] = useState("")
    const [venueAddressURL, setVenueAddressURL] = useState("")
    const [venueRating, setVenueRating] = useState(0.0)
    const [venuePhone, setVenuePhone] = useState("")
    const [venueSportType, setVenueSportType] = useState("")
    const [venueImageURL, setVenueImageURL] = useState()
    const [venueOpenTime, setVenueOpenTime] = useState({})
    const [venueFacilities, setFacilities] = useState([])
    const [fieldList, setFieldList] = useState([])
    const [fieldFloorTypeSearch, setFieldFloorTypeSearch] = useState([])
    const [field, setField] = useState({})
    const [fieldImageURL, setFieldImageURL] = useState()
    const [venue, setVenue] = useState()
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    let history = useHistory()

    useEffect(() => {
    }, [venueName, venueAddress, venueAddressURL, venueOpenTime, venueSportType])

    const getVenues = () => {
        const ref = firestore.collection("venues")
        ref.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const venue = doc.data()
                if (venue.venueId === id){
                    setVenue(venue)
                    setVenueName(venue.venueName)
                    setVenueAddress(venue.venueAddress)
                    setVenueAddressURL(venue.venueAddressURL)
                    setVenueRating(venue.venueRating)
                    setVenuePhone(venue.venuePhone)
                    setVenueSportType(venue.venueSportType)
                    setVenueOpenTime(venue.venueOpenTime)
                    setFacilities(venue.venueFacilities)
                    setFieldList(venue.fieldList)
                    setVenueImageURL(venue.venueImage)
                }
            })
        })
    }

    const handleAdd = () => {
        getVenues()
    }

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
        venueOpenTime[e.target.id] = e.target.value
        forceUpdate()
    }

    const handleChangeFacilities = (e) => {
        if (e.target.checked){
            venueFacilities.push(e.target.id)
        } else {
            venueFacilities.splice(venueFacilities.indexOf(e.target.id),1)
        }
        forceUpdate()
    }

    const handleChangeVenueImage = (e) => {
        const venueImage = e.target.files[0]
        const uploadImage = storage.ref(`venueImage/${venueId}/${venueName}`).put(venueImage)
        uploadImage.on(
            "state_changed",
            snapshot => {},
            error => {console.log(error)},
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
        venue.venueName = venueName
        venue.venueAddress = venueAddress
        venue.venueAddressURL = venueAddressURL
        venue.venueRating = venueRating
        venue.venuePhone = venuePhone
        venue.venueSportType = venueSportType
        venue.venueOpenTime = venueOpenTime
        venue.venueFacilities = venueFacilities
        venue.fieldList = fieldList
        venue.fieldFloorTypeSearch = fieldFloorTypeSearch
        venue.venueImage = venueImageURL

        pushVenue(venue)
        history.push('/admin')
    }

    const pushVenue = (venue) => {
        firebase.firestore().collection("venues").doc(venue.venueId).set(venue)
    }

    const handleChangeField = (e) => {
        field[e.target.id] = e.target.value
        if (e.target.id === "floorType"){
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

    const handleDeleteImage = () => {
        setVenueImageURL("")
    }

    const handleAddField = () => {
        fieldList.push(field)
        console.log(field)
        toggleDialog()
        setField({})
    }

    const handleDeleteField = (index) => {
        fieldList.splice(index,1)
        forceUpdate()
    }

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }
    return(
        <div>
            <h1 className="mb-3">Edit venue</h1>
            <Button variant="primary" onClick={handleAdd}>Edit</Button>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Name</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venueName} id="venueName" type="text" placeholder="Enter Name" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Address</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venueAddress} id="venueAddress" as="textarea" placeholder="Enter Name" rows="3" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Google Map URL</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venueAddressURL} id="venueURL" type="text" placeholder="Enter URL" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Rating</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venueRating} id="venueRating" type="number" step="0.5" placeholder="Enter Rating" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Phone number</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venuePhone} id="venuePhone" type="number" placeholder="Enter Phone" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Sport Type</p>
                </Col>
                <Col lg={6}>
                    <Form.Group>
                        <Form.Control onChange={handleChange} id="sportType" as="select">
                            <option  hidden>Choose here</option>
                            {
                                venueSportType==="Futsal"? (
                                    <option selected >Futsal</option>
                                ) : (
                                     <option>Futsal</option>
                                )
                            }
                            {
                                venueSportType ==="Basket"? (
                                    <option selected >Basket</option>
                                ) : (
                                     <option>Basket</option>
                                )
                            }
                            {
                                venueSportType ==="Volley"? (
                                    <option selected >Volley</option>
                                ) : (
                                     <option>Volley</option>
                                )
                            }
                            {
                                venueSportType ==="Badminton"? (
                                    <option selected >Badminton</option>
                                ) : (
                                     <option>Badminton</option>
                                )
                            }
                            {
                                venueSportType ==="Tennis"? (
                                    <option selected >Tennis</option>
                                ) : (
                                     <option>Tennis</option>
                                )
                            }
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
                            <Form.Control type="time" id="time1Monday" value={venueOpenTime.time1Monday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Monday" value={venueOpenTime.time2Monday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Tuesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Tuesday" value={venueOpenTime.time1Tuesday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Tuesday" value={venueOpenTime.time2Tuesday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Wednesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Wednesday" value={venueOpenTime.time1Wednesday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Wednesday" value={venueOpenTime.time2Wednesday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Thursday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Thursday" value={venueOpenTime.time1Thursday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Thursday" value={venueOpenTime.time2Thursday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Friday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Friday" value={venueOpenTime.time1Friday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Friday" value={venueOpenTime.time2Friday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Saturday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Saturday" value={venueOpenTime.time1Saturday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Saturday" value={venueOpenTime.time2Saturday} onChange={handelOpenTimeChange}/>
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Sunday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time1Sunday" value={venueOpenTime.time1Sunday} onChange={handelOpenTimeChange}/>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" id="time2Sunday" value={venueOpenTime.time2Sunday} onChange={handelOpenTimeChange}/>
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
                            <Form.Check checked={venueFacilities.includes("wifi") ? true : false } onChange={handleChangeFacilities} id="wifi" type="checkbox" label="Wi-Fi" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("toilets") ? true : false} onChange={handleChangeFacilities} id="toilets" type="checkbox" label="Toilets" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("parking") ? true : false} onChange={handleChangeFacilities} id="parking" type="checkbox" label="Parking" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("bathroom") ? true : false} onChange={handleChangeFacilities} id="bathroom" type="checkbox" label="Bathroom" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("charging") ? true : false} onChange={handleChangeFacilities} id="charging" type="checkbox" label="Charging Station" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("shoesRent") ? true : false} onChange={handleChangeFacilities} id="shoesRent" type="checkbox" label="Shoes Rent" />
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
                            fieldList.map((field,key) => {
                                return(
                                    <div>
                                        <MyFieldCardAdmin
                                            fieldImage={field.fieldImage}
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
                <Col lg={3}>
                    <p>Add Photo</p>
                </Col>
                <Col lg={6}>
                    <Form.File label="Upload Image" type="file" onChange={handleChangeVenueImage} />
                    <Image src={venueImageURL} rounded />
                    {
                        venueImageURL !== "" ? (
                            <Button variant="primary" onClick={handleDeleteImage}>Delete</Button>
                        ) : null
                    }
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={6}>
                    <Button variant="primary" onClick={handleSubmitVenue}>Update Venue</Button>
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
                        <Col><Form.File label="Upload Image" type="file" onChange={handleChangeFieldImage}/></Col>
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

export default MyEditVenueAdmin