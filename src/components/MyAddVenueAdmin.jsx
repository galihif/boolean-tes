import React from 'react'
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'

const MyAddVenueAdmin = () => {
    let history = useHistory()
    let { path, url } = useRouteMatch()

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
    }
    return(
        <div>
            <h1 className="mb-3">Add venue</h1>
        </div>
    )
}

export default MyAddVenueAdmin