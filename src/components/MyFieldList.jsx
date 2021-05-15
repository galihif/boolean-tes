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
                                    field_name={field.fieldName}
                                    sport_type={field.sportType}
                                    field_type={field.fieldType}
                                    floor_type={field.floorType}
                                    price={field.fieldPrice}
                                    image={field.fieldImage}
                                    venue_data={props.venueData}
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