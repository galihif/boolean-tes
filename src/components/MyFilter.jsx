import React, { } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap';

import './MyFilter.scss'

const MyFilter = () => {
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
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                    </Form.Group>
                </Row>
                <Row className="pl-3 pr-3">
                    <h5>Floor</h5>
                </Row>
                <Row className="pl-3 pr-3">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Vinyl" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                        <Form.Check type="checkbox" label="Futsal" />
                    </Form.Group>
                </Row>
            </Container>
        </Container>

    )
}

export default MyFilter