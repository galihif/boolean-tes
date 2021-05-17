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
        venueId: this.props.match.params.id,
        venueData: [],
        fieldList: [],
        isLoading: false
    }

    getData() {
        this.setState({
            isLoading: true
        })
        const ref = firebase.firestore().collection("venues").doc(this.state.venueId)
        ref.get().then((doc) => {
            if(doc.exists){
                this.setState({
                    venueData: doc.data(),
                    fieldList: doc.data().fieldList,
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
        const {isLoading, venueData, fieldList} = this.state
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
                                    name={venueData.venueName}
                                    address={venueData.venueAddress}
                                    image={venueData.venueImage}
                                    addressURL={venueData.venueAddressURL}
                                    phone={venueData.venuePhone}
                                />
                                <MyFacilities 
                                    venueOpenTime={venueData.venueOpenTime}/>
                                <MyFieldList fieldList={fieldList} venueData={venueData}/>
                            </div>
                    )
                }
            </div>
        )
    }
}

export default VenueDetails