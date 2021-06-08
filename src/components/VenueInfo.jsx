import React,{useState,useEffect} from 'react'
import { Modal, Container, Tab, Row, Nav, Image, Col, Form, Button } from 'react-bootstrap'
import firebase, { firestore, storage } from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import MyFieldCardAdmin from './MyFieldCardAdmin'

const VenueInfo = (props) => {

    let history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [showDialog, setShowDialog] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [venue, setVenue] = useState(state.venueData)
    const [userId, setUserId] = useState(props.userId)
    const [venueId, setVenueId] = useState(userId)
    const [venueName, setVenueName] = useState(venue.venueName)
    const [venueAddress, setVenueAddress] = useState(venue.venueAddress)
    const [venueAddressURL, setVenueAddressURL] = useState(venue.venueAddressURL)
    const [venueEmbedURL, setVenueEmbedURL] = useState(venue.venueEmbedURL)
    const [venueRating, setVenueRating] = useState(venue.venueRating)
    const [venuePhone, setVenuePhone] = useState(venue.venuePhone)
    const [venueSportType, setVenueSportType] = useState(venue.venueSportType)
    const [venueImageURL, setVenueImageURL] = useState(venue.venueImage)
    const [venueOpenTime, setVenueOpenTime] = useState(venue.venueOpenTime)
    const [venueFacilities, setFacilities] = useState(venue.venueFacilities)
    const [fieldList, setFieldList] = useState(venue.fieldList)
    const [fieldFloorTypeSearch, setFieldFloorTypeSearch] = useState(venue.fieldFloorTypeSearch)
    const [field, setField] = useState({})
    const [fieldImageURL, setFieldImageURL] = useState()
    const [time, setTime] = useState(Array.from(Array(24).keys()))

    useEffect(() => {
        console.log(venueImageURL)
    });

    const getVenues = () => {
        const ref = firestore.collection("venues")
        ref.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const venue = doc.data()
                if (venue.venueId === userId) {
                    setVenue(venue)
                    setVenueName(venue.venueName)
                    setVenueAddress(venue.venueAddress)
                    setVenueAddressURL(venue.venueAddressURL)
                    setVenueEmbedURL(venue.venueEmbedURL)
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

    const handlePreview = () => {
        history.push(`/venuedetails/${venueId}`)
    }

    const handleEdit = () => {
        getVenues()
        setEdit(true)
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
        venueOpenTime[e.target.id] = e.target.value
        forceUpdate()
    }

    const handleChangeFacilities = (e) => {
        if (e.target.checked) {
            venueFacilities.push(e.target.id)
        } else {
            venueFacilities.splice(venueFacilities.indexOf(e.target.id), 1)
        }
        forceUpdate()
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
        venue.venueName = venueName
        venue.venueAddress = venueAddress
        venue.venueAddressURL = venueAddressURL
        venue.venueEmbedURL = venueEmbedURL
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
        fieldList.splice(index, 1)
        forceUpdate()
    }

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }


    
    return(
        <div>
            <h1 className="mb-3">Venue Information</h1>
            {/* <Button variant="primary" onClick={handleEdit}>Edit</Button> */}
            <Button variant="primary" onClick={handlePreview}>Preview</Button>
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
                    <p>Embed Map URL</p>
                </Col>
                <Col lg={6}>
                    <Form.Control onChange={handleChange} value={venueEmbedURL} id="venueEmbedURL" type="text" placeholder="Enter URL" />
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
                            <option hidden>Choose here</option>
                            {
                                venueSportType === "Futsal" ? (
                                    <option selected >Futsal</option>
                                ) : (
                                    <option>Futsal</option>
                                )
                            }
                            {
                                venueSportType === "Basket" ? (
                                    <option selected >Basket</option>
                                ) : (
                                    <option>Basket</option>
                                )
                            }
                            {
                                venueSportType === "Volley" ? (
                                    <option selected >Volley</option>
                                ) : (
                                    <option>Volley</option>
                                )
                            }
                            {
                                venueSportType === "Badminton" ? (
                                    <option selected >Badminton</option>
                                ) : (
                                    <option>Badminton</option>
                                )
                            }
                            {
                                venueSportType === "Tennis" ? (
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
                            <Form.Group>
                                <Form.Control onChange={handelOpenTimeChange} id="time1Monday" as="select" value={venueOpenTime.time1Monday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Monday" as="select" value={venueOpenTime.time2Monday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Tuesday" as="select" value={venueOpenTime.time1Tuesday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Tuesday" as="select" value={venueOpenTime.time2Tuesday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Wednesday" as="select" value={venueOpenTime.time1Wednesday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Wednesday" as="select" value={venueOpenTime.time2Wednesday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Thursday" as="select" value={venueOpenTime.time1Thursday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Thursday" as="select" value={venueOpenTime.time2Thursday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Friday" as="select" value={venueOpenTime.time1Friday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Friday" as="select" value={venueOpenTime.time2Friday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Saturday" as="select" value={venueOpenTime.time1Saturday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time2Saturday" as="select" value={venueOpenTime.time2Saturday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Monday" as="select" value={venueOpenTime.time1Monday}>
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
                                <Form.Control onChange={handelOpenTimeChange} id="time1Monday" as="select" value={venueOpenTime.time1Monday}>
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
                <Col lg={3}>
                    <p>Facilities</p>
                </Col>
                <Col lg={6}>
                    <Row className="my-1">
                        <Col lg={6}>
                            <Form.Check checked={venueFacilities.includes("wifi") ? true : false} onChange={handleChangeFacilities} id="wifi" type="checkbox" label="Wi-Fi" />
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
                            fieldList.map((field, key) => {
                                return (
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
    )
}

export default VenueInfo