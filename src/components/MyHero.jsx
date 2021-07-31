import React, {useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Jumbotron, Form, Col, Container, Row } from 'react-bootstrap';
import './MyHero.scss'

const MyHero = (props) => {
    const [searchKeyword, setSearchKeyword] = useState("")
    let history = useHistory()

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleChangeSearch = (e) => {
        setSearchKeyword(capitalizeFirstLetter(e.target.value))
    }

    const handleSearch = () => {
        history.push(`/venues/search/${searchKeyword}`)
    }
    return (
        <Jumbotron className="hero-container">
            <br/>
            <br/>
            <Container className="tagline-container justify-content-lg-start justify-content-sm-center ml-lg-5 mt-lg-5">
                <Row className="my-3">
                    <Col>
                        <h1>
                            Explore Your <br /> 
                            Favourite Venues
                        </h1>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col lg={6}>
                        <Form.Row className="search-venues">
                            <Form.Control onChange={handleChangeSearch} type="text" id="searchKeyword" placeholder="Where do you want to play?" className="search-form my-lg-0 my-2 mr-2" />
                            <Button onClick={handleSearch} className="btn-my-primary align-self-center" variant="primary" >Search</Button>
                        </Form.Row>
                    </Col>
                </Row>
            </Container>

        </Jumbotron>
    )
}

export default MyHero