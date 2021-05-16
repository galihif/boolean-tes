import React, {useState} from 'react'
import {Row, Col } from 'react-bootstrap';

import './MyFieldList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFieldCard from './MyFieldCard';


const MyFieldList = (props) => {
    const [fieldList, setFieldList] = useState(props.fieldList);
    console.log(fieldList)

    return (
        <div className="field-list px-5">
            <h2>Field List</h2>
            <Row className="mr-1">
                {
                    fieldList.map((field) => {
                        return (
                            <Col lg={8} className="my-2">
                                <MyFieldCard
                                    fieldName={field.fieldName}
                                    sportType={field.sportType}
                                    fieldType={field.fieldType}
                                    floorType={field.floorType}
                                    fieldPrice={field.fieldPrice}
                                    fieldImage={field.fieldImage}
                                    venueData={props.venueData}
                                />
                            </Col>
                        )
                    })
                }
            </Row>

        </div>
    )
}

export default MyFieldList