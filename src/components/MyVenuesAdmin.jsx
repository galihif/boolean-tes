import React,{useState,useEffect} from 'react'
import { Modal, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import firebase, { firestore } from '../config/firebase'
import { useSelector, useDispatch } from 'react-redux'



const MyVenuesAdmin = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    let history = useHistory()
    let { path, url } = useRouteMatch()
    const [venues, setVenues] = useState([])
    const [venueId, setVenueId] = useState("")
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        getVenues()
    })

    const getVenues = () => {
        const ref = firebase.firestore().collection("venues")
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setVenues(items)
        })
    }

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
    }

    const handleEditVenue = (venue) => {
        history.push(`${url}/edit-venue/${venue.venueId}`)
        dispatch({ type: "setVenueData", venueData: venue })
    }

    const handleDeleteVenue = () => {
        firestore.collection("venues").doc(venueId).delete()
        .then(() => {
            console.log("Success")
            setShowDialog(!showDialog)
        }).catch((error) => {
            console.log(error)
            setShowDialog(!showDialog)
        })
    }
    
    const toggleDialog = (id) => {
        setShowDialog(!showDialog)
        setVenueId(id)
    }
    return(
        <div>
            <h1 className="mb-3">Venues</h1>
            <div className="venues-table">
                <Button variant="primary" onClick={handleAddVenue} className="my-3">Add Venue</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Fields</th>
                            <th>Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            venues.length > 0 ? (
                                venues.map((venue) => {
                                    return(
                                        <tr>
                                            <td>{venue.venueId}</td>
                                            <td>{venue.venueName}</td>
                                            <td>{venue.venueSportType}</td>
                                            <td>{venue.numberOfFields}</td>
                                            <td>{venue.joinedAt}</td>
                                            <td>
                                                <Button onClick={() => handleEditVenue(venue)} variant="primary" type="">Edit</Button>{' '}
                                                <Button onClick={() => toggleDialog(venue.venueId)} variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : null
                        }
                    </tbody>
                </Table>

                <Modal show={showDialog} onHide={toggleDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Field</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Serius Mau Dihapus?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleDialog}>
                            Cancel
                    </Button>
                        <Button variant="primary" onClick={handleDeleteVenue}>
                            Yes
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <br />
            <br />
        </div>
    )
}

export default MyVenuesAdmin