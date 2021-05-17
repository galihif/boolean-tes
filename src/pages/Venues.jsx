import React, { Component } from 'react'
import {Container, Row, Col, Spinner } from 'react-bootstrap';
import firebase from '../config/firebase'

import './Venues.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFindField from '../components/MyFindField';
import MyFilter from '../components/MyFilter';
import MyVenueCard from '../components/MyVenueCard';

class Venues extends Component {

    state = {
        venues: [],
        isLoading: false
    }

    getVenues(){
        const ref = firebase.firestore().collection("venues")
        this.setState({isLoading: true})
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            this.setState({
                venues: items,
                isLoading: false
            })
        })
    }

    componentDidMount(){
        this.getVenues()
    }

    render() {
        const {venues, isLoading} = this.state

        return (
            <div>
                <MyFindField/>
                   
                <Container className="mt-5">
                    <Row className="justify-content-center d-flex">
                        <Col lg={2} xs={10} className="mx-xs-auto">
                            <MyFilter/>
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
                                    ) : null
                                }
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
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Venues