import React, {useState } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap';

import './MyFilter.scss'

const MyFilter = () => {
    const [catFilter, setCatFilter] = useState([])

    const handleChangeCategory = (e) => {
        if(e.target.checked){
            catFilter.push(e.target.id)
        } else {
            catFilter.splice(catFilter.indexOf(e.target.id),1)
        }
        console.log(catFilter)
    }
    return (
        <Container className="filter-container d-flex justify-content-center p-0">
            <Container className="filter-box p-4">
                <Row className="d-flex justify-content-center">
                    <h3>Filter</h3>
                </Row>
                <Row className="pl-3 pr-3">
                    <h5>Category</h5>
                </Row>
                <Row className="pl-3 pr-3">
                    <Form.Group controlId="category">
                        <Form.Check type="checkbox" label="Futsal" id="Futsal" onChange={handleChangeCategory}/>
                        <Form.Check type="checkbox" label="Basket" id="Basket" onChange={handleChangeCategory}/>
                        <Form.Check type="checkbox" label="Volley" id="Volley" onChange={handleChangeCategory}/>
                        <Form.Check type="checkbox" label="Tennis" id="Tennis" onChange={handleChangeCategory}/>
                        <Form.Check type="checkbox" label="Badminton" id="Badminton" onChange={handleChangeCategory} />
                    </Form.Group>
                </Row>
                <Row className="pl-3 pr-3">
                    <h5>Floor</h5>
                </Row>
                <Row className="pl-3 pr-3">
                    <Form.Group controlId="floor">
                        <Form.Check type="checkbox" label="Vinyl" />
                        <Form.Check type="checkbox" label="Synthetic Grass" />
                        <Form.Check type="checkbox" label="Cement" />
                        <Form.Check type="checkbox" label="Parquette" />
                        <Form.Check type="checkbox" label="Taraflex" />
                    </Form.Group>
                </Row>
            </Container>
        </Container>

    )
}

export default MyFilter