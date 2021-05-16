import React,{useState,useEffect} from 'react'
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import firebase,{firestore} from '../config/firebase'

const MyVenuesAdmin = () => {
    const [venues, setVenues] = useState([])
    let history = useHistory()
    let { path, url } = useRouteMatch()

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
                                                <Button variant="primary" type="">Edit</Button>{' '}
                                                <Button variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : null
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MyVenuesAdmin