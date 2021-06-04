import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Form, Jumbotron, Button } from 'react-bootstrap';
import firebase from '../config/firebase'
import { useHistory, useParams } from 'react-router-dom'

import './Venues.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFindField from '../components/MyFindField';
import MyFilter from '../components/MyFilter';
import MyVenueCard from '../components/MyVenueCard';

const Venues = (props) => {
    let{keyword,cat} = useParams()
    const [venues, setVenues] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [sportFilter, setSportFilter] = useState([])
    const [floorFilter, setFloorFilter] = useState([])
    const [searchKeyword, setSearchKeyword] = useState(keyword)
    const [catSearch, setCatSearch] = useState(cat)

    useEffect(() => {
        getVenues()
        console.log(catSearch)
    }, [])

    const handleChangeSport = (e) => {
        if (e.target.checked) {
            sportFilter.push(e.target.id)
        } else {
            sportFilter.splice(sportFilter.indexOf(e.target.id), 1)
        }
        getVenues()
    }
    const handleChangeFloor = (e) => {
        if (e.target.checked) {
            floorFilter.push(e.target.id)
        } else {
            floorFilter.splice(floorFilter.indexOf(e.target.id), 1)
        }
        getVenues()
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleChangeSearch = (e) => {
        setSearchKeyword(capitalizeFirstLetter(e.target.value))
    }

    const handleSearch = () => {
        console.log(searchKeyword)
        getVenues()
    }

    const getVenues = () => {
        const items = []
        setLoading(true)
        const ref = firebase.firestore().collection("venues")
        if (searchKeyword !== "" && typeof searchKeyword !== "undefined"){
            setShowResult(true)
            ref.onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    const venueName = doc.data().venueName
                    const venueAddress = doc.data().venueAddress
                    if(venueName.includes(searchKeyword) || venueAddress.includes(searchKeyword)){
                        items.push(doc.data())
                    }
                })
                setLoading(false)
            })
        }
        else if(sportFilter.length === 0 && floorFilter.length === 0){
            ref.onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    items.push(doc.data())
                    const venueName = doc.data().venueName
                })
                setLoading(false)
            })
        } else if (sportFilter.length !== 0 && floorFilter.length === 0) {
            ref
                .where("venueSportType", "in", sportFilter)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        items.push(doc.data())
                    })
                    setLoading(false)
                })
            console.log(items)
        } else if (sportFilter.length === 0 && floorFilter.length !== 0) {
            ref
                .where("fieldFloorTypeSearch", "array-contains-any", floorFilter)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        items.push(doc.data())
                    })
                    setLoading(false)
                })
            console.log(items)
        } else if (sportFilter.length !== 0 && floorFilter.length !== 0) {
            ref
                // .where("venueSportType", "in", sportFilter)
                // .where("fieldFloorTypeSearch", "array-contains-any", floorFilter)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        const venue = doc.data()
                        if (sportFilter.includes(venue.venueSportType) && floorFilter.some(floor => venue.fieldFloorTypeSearch.includes(floor))){
                            items.push(venue)
                        }
                    })
                    setLoading(false)
                })
            ref
                .where("fieldFloorTypeSearch", "array-contains-any", floorFilter)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        items.push(doc.data())
                    })
                    setLoading(false)
                })
        }
        
        setVenues(items)
    }
    return (
        <div>
            <Jumbotron className="find-container pl-lg-5">
                <Container className="">
                    <Row>
                        <h1 className="">
                            Find Your Favourite Venues
                    </h1>
                    </Row>
                    <Row className="search-venues justify-content-left justify-content-xs-center">
                        <Col lg={3} className="p-0 mr-3">
                            <Form.Control onChange={handleChangeSearch} type="text" id="searchKeyword" placeholder="Where do you want to play?" className="search-form" />
                        </Col>
                        <Col lg={3} className="p-0 align-items-center">
                            <Button onClick={handleSearch} className="btn-my-primary mx-auto align-self-center" variant="primary" >Search</Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
                
            <Container className="mt-5">
                <Row className="justify-content-center d-flex">
                    <Col lg={2} xs={10} className="mx-xs-auto">
                        <Container className="filter-container d-flex justify-content-center p-0">
                            <Container className="filter-box p-4">
                                <Row className="d-flex justify-content-center">
                                    <h3>Filter</h3>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <h5>Sport</h5>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <Form.Group controlId="sport">
                                        <Form.Check type="checkbox" label="Futsal" id="Futsal" onChange={handleChangeSport} />
                                        <Form.Check type="checkbox" label="Basket" id="Basket" onChange={handleChangeSport} />
                                        <Form.Check type="checkbox" label="Volley" id="Volley" onChange={handleChangeSport} />
                                        <Form.Check type="checkbox" label="Tennis" id="Tennis" onChange={handleChangeSport} />
                                        <Form.Check type="checkbox" label="Badminton" id="Badminton" onChange={handleChangeSport} />
                                    </Form.Group>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <h5>Floor</h5>
                                </Row>
                                <Row className="pl-3 pr-3">
                                    <Form.Group controlId="floor">
                                        <Form.Check type="checkbox" label="Vinyl" id="Vinyl" onChange={handleChangeFloor}/>
                                        <Form.Check type="checkbox" label="Synthetic Grass" id="Synthetic Grass" onChange={handleChangeFloor}/>
                                        <Form.Check type="checkbox" label="Cement" id="Cement" onChange={handleChangeFloor}/>
                                        <Form.Check type="checkbox" label="Parquette" id="Parquette" onChange={handleChangeFloor}/>
                                        <Form.Check type="checkbox" label="Taraflex" id="Taraflex" onChange={handleChangeFloor}/>
                                    </Form.Group>
                                </Row>
                            </Container>
                        </Container>
                    </Col>
                    <Col lg={10}>
                        <Container className="list-venue-container">
                            {
                                showResult ? (
                                    <h4 className="mb-3">Showing results of '{searchKeyword}'</h4>
                                ) : null
                            }
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