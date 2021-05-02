import React, { Component } from 'react'
import firebase from '../config/firebase'
import { Row, Container, Spinner } from 'react-bootstrap';

import './VenueDetails.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyVenueHeader from '../components/MyVenueHeader';
import MyFacilities from '../components/MyFacilities';
import MyFieldList from '../components/MyFieldList';


class VenueDetails extends Component{

    state = {
        venue_id: this.props.match.params.id,
        venue_data: [],
        isLoading: false
    }

    getData() {
        this.setState({
            isLoading: true
        })
        const ref = firebase.firestore().collection("venues").doc(this.state.venue_id)
        ref.get().then((doc) => {
            if(doc.exists){
                console.log(doc.data().name,"1")
                this.setState({
                    venue_data: doc.data(),
                    isLoading: false
                })
            }
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        const {isLoading, venue_data} = this.state
        return (
            <div>
                {
                    isLoading ? (
                        <Container className="d-flex justify-content-center p-5">
                            <Row className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br /><br /><br /><br />
                            </Row>
                        </Container>
                    ) : (
                            <div>
                                <MyVenueHeader
                                    name={venue_data.name}
                                    address={venue_data.address}
                                    image={venue_data.image}
                                />
                                <MyFacilities />
                                <MyFieldList />
                            </div>
                    )
                }
            </div>
        )
    }
}

export default VenueDetails