import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import firebase from '../config/firebase'

import './Venues.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFindField from '../components/MyFindField';
import MyFilter from '../components/MyFilter';
import MyVenueCard from '../components/MyVenueCard';

const Venues = () => {
    const [venues, setVenues] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [catFilter, setCatFilter] = useState([])

    useEffect(() => {
        getVenues()
    }, [])

    const handleChangeCategory = (e) => {
        if (e.target.checked) {
            catFilter.push(e.target.id)
        } else {
            catFilter.splice(catFilter.indexOf(e.target.id), 1)
        }
        console.log(catFilter)
    }

    const getVenues = () => {
        const ref = firebase.firestore().collection("venues")
        setLoading(true)
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setVenues(items)
            setLoading(false)
        })
    }


    return (
        <div>
            <MyFindField/>
                
            <Container className="mt-5">
                <Row className="justify-content-center d-flex">
                    <Col lg={2} xs={10} className="mx-xs-auto">
                        <Container className="filter-container d-flex justify-content-center p-0">
                            <Container className="filter-box p-4">
                                <Row className="d-flex justify-content-center">
                                    <h3>Filter</h3>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <h5>Category</h5>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <Form.Group controlId="category">
                                        <Form.Check type="checkbox" label="Futsal" id="Futsal" onChange={handleChangeCategory} />
                                        <Form.Check type="checkbox" label="Basket" id="Basket" onChange={handleChangeCategory} />
                                        <Form.Check type="checkbox" label="Volley" id="Volley" onChange={handleChangeCategory} />
                                        <Form.Check type="checkbox" label="Tennis" id="Tennis" onChange={handleChangeCategory} />
                                        <Form.Check type="checkbox" label="Badminton" id="Badminton" onChange={handleChangeCategory} />
                                    </Form.Group>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <h5>Floor</h5>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <Form.Group controlId="floor">
                                        <Form.Check type="checkbox" label="Vinyl" />
                                        <Form.Check type="checkbox" label="Synthetic Grass" />
                                        <Form.Check type="checkbox" label="Cement" />
                                        <Form.Check type="checkbox" label="Parquette" />
                                        <Form.Check type="checkbox" label="Taraflex" />
                                    </Form.Group>
                                </Row>
                            </Container>
                        </Container>
                    </Col>
                    <Col lg={10}>
                        <Container className="list-venue-container">
                            {
                                isLoading ? (
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                        <br /><br /><br /><br /><br /><br /><br /><br />
                                        <br /><br /><br /><br /><br /><br /><br /><br />
                                    </Row>
                                ) : (
                                        <Row className="d-flex justify-content-left">
                                            {
                                                venues.map((venue) => {
                                                    return (
                                                        <Col lg={4} className="px-3 mx-0 mb-3">
                                                            <MyVenueCard
                                                                key={venue.venueId}
                                                                venueName={venue.venueName}
                                                                venueId={venue.venueId}
                                                                numberOfFields={venue.numberOfFields}
                                                                venueAddress={venue.venueAddress}
                                                                venueSportType={venue.venueSportType}
                                                                venueImage={venue.venueImage}
                                                                venueRating={venue.venueRating}
                                                            />
                                                        </Col>
                                                    )
                                                })

                                            }
                                        </Row>
                                )
                            }
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Venues