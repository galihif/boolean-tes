import React, { Component } from 'react'

import './VenueDetails.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyVenueHeader from '../components/MyVenueHeader';
import MyFacilities from '../components/MyFacilities';
import MyFieldList from '../components/MyFieldList';


const VenueDetails = () => {

    return(
        <div>
            <MyVenueHeader/>
            <MyFacilities/>
            <MyFieldList/>
        </div>
        
    )
}

export default VenueDetails