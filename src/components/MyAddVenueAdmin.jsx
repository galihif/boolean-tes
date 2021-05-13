import React, { useState} from 'react'
import { Col, Form, Modal, Row, Nav, Image, Card, Table, Button, FormGroup, FormControl } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import MyButton from '../atom/MyButton'

const MyAddVenueAdmin = () => {
    const [showDialog, setShowDialog] = useState(false)
    let history = useHistory()
    let { path, url } = useRouteMatch()

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
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
                    <Form.Control type="text" placeholder="Enter Name" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Address</p>
                </Col>
                <Col lg={6}>
                    <Form.Control as="textarea" placeholder="Enter Name" rows="3" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Google Map URL</p>
                </Col>
                <Col lg={6}>
                    <Form.Control type="text" placeholder="Enter URL" />
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Phone number</p>
                </Col>
                <Col lg={6}>
                    <Form.Control type="number" placeholder="Enter Phone" />
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
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Tuesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Wednesday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Thursday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Friday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Saturday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col lg={3}>
                            <p>Sunday</p>
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
                        </Col>
                        <Col lg>
                            <Form.Control type="time" placeholder="Enter Phone" />
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
                            <Form.Check type="checkbox" label="Free Wi-Fi" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check type="checkbox" label="Toilets" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check type="checkbox" label="Parking" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check type="checkbox" label="Bathroom" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check type="checkbox" label="Charging Station" />
                        </Col>
                        <Col lg={6}>
                            <Form.Check type="checkbox" label="Shoes Rent" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="my-3">
                <Col lg={3}>
                    <p>Field List</p>
                </Col>
                <Col lg={6}>
                    <Button variant="primary" onClick={toggleDialog}>Add Field</Button>
                </Col>
            </Row>
            <Modal show={showDialog} onHide={toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-2">
                        <Col lg={3}><p>Field name</p></Col>
                        <Col><Form.Control id="fieldName" type="text" placeholder="Enter Name" /></Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={3}><p>Field Type</p></Col>
                        <Col>
                            <Form.Group controlId="fieldType">
                                <Form.Check inline label="Indoor" name="group1" type="radio"/>
                                <Form.Check inline label="Outdoor" name="group1" type="radio"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col lg={3}><p>Sport Type</p></Col>
                        <Col>
                            <Form.Group controlId="sportType">
                                <Form.Control as="select">
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
                            <Form.Group controlId="floorType">
                                <Form.Control as="select">
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
                        <Col><Form.Control id="fieldName" type="number" placeholder="Enter Name" /></Col>
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
                    <Button variant="primary" onClick={toggleDialog}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyAddVenueAdmin