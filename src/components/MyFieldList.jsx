
import React, {  } from 'react'
import {Row, Col } from 'react-bootstrap';

import './MyFieldList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFieldCard from './MyFieldCard';


const MyFieldList = () => {

    return (
        <div className="field-list px-5">
            <h2>Field List</h2>
            <Row className="mr-1">
                <Col lg={8} className="my-2">
                    <MyFieldCard/>
                </Col>
                <Col lg={8} className="my-2">
                    <MyFieldCard/>
                </Col>
                <Col lg={8} className="my-2">
                    <MyFieldCard/>
                </Col>
            </Row>

        </div>
    )
}

export default MyFieldList