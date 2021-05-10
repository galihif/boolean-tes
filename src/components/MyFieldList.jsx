import React, {useState} from 'react'
import {Row, Col } from 'react-bootstrap';

import './MyFieldList.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyFieldCard from './MyFieldCard';


const MyFieldList = (props) => {
    const [fieldList, setFieldList] = useState(props.field_list);
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
                                    field_name={field.field_name}
                                    sport_type={field.sport_type}
                                    field_type={field.field_type}
                                    floor_type={field.floor_type}
                                    price={field.price}
                                    image={field.image}
                                    venue_data={props.venue_data}
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