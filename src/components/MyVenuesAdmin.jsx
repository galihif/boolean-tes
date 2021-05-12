import React from 'react'
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'

const MyVenuesAdmin = () => {
    let history = useHistory()
    let { path, url } = useRouteMatch()

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
    }
    console.log(url,"venue admin")
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
                        <tr>
                            <td>0</td>
                            <td>Golden Goal</td>
                            <td>Futsal</td>
                            <td>4</td>
                            <td>2021-01-01</td>
                            <td>
                                <Button variant="primary" type="">Edit</Button>{' '}
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MyVenuesAdmin