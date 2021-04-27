import React, { Component } from 'react'
import { Button, Jumbotron, Row, Col, Container } from 'react-bootstrap';

import './MyVenueHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import rating from '../assets/rating_5_5.png'


const MyVenueHeader = () => {

    return (
        <div className="venue-header">
            <Jumbotron className="p-5">
                <Col lg={4}>
                    <h1>Golden Goal</h1>
                    <p>
                        Jl. Pogung Raya No.172, Pogung Baru, Sinduadi, Mlati, Pogung Kidul, Sinduadi,
                        Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284.
                        <br />
                        <a href="https://goo.gl/maps/zU7epfsu7uob7WEX7" target="_blank">Open in map</a>
                    </p>
                    <h6>081234567890</h6>
                    <img src={rating} />
                </Col>
            </Jumbotron>
        </div>

    )
}

export default MyVenueHeader