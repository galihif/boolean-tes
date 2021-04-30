import React, { Component } from 'react'
import { Button, Card, Badge, Form, Container, Row, Col } from 'react-bootstrap';
import firebase from '../config/firebase'

import './Venues.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFindField from '../components/MyFindField';
import MyFilter from '../components/MyFilter';
import MyVenueCard from '../components/MyVenueCard';

class Venues extends Component {

    state = {
        venues: []
    }

    getVenues(){
        const ref = firebase.firestore().collection("venues")
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            this.setState({
                venues: items
            })
            console.log(this.state.venues)
        })
    }

    componentDidMount(){
        this.getVenues()
    }

    render() {
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
                                <Row className="d-flex justify-content-left">
                                    {
                                        this.state.venues.map((venue) => {
                                            return (
                                                <Col lg={4} className="px-3 mx-0 mb-3">
                                                    <MyVenueCard 
                                                        key = {venue.id}
                                                        name = {venue.name}
                                                        number_of_fields={venue.number_of_fields}
                                                        address={venue.address}
                                                        sport_type={venue.sport_type}
                                                        image={venue.image}
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