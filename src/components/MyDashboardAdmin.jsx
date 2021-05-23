import React,{useState, useEffect} from 'react'
import { Col, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import firebase, { firestore } from '../config/firebase'

const MyDashboardAdmin = () => {
    const [venues, setVenues] = useState(0)
    const [fields, setFields] = useState(0)
    const [users, setUsers] = useState(0)
    const [bookings, setBookings] = useState(0)

    useEffect(() => {
        getVenues()
        getFields()
        getUsers()
        getBookings()
    })

    const getVenues = () => {
        const ref = firestore.collection("venues")
        ref.onSnapshot((snapshot) => {
            setVenues(snapshot.size)
        })
    }
    const getFields = () => {
        const ref = firestore.collection("venues")
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                const venue = doc.data()
                venue.fieldList.forEach((field) => {
                    items.push(field)
                })
            })
            setFields(items.length)
        })
    }
    const getBookings = () => {
        const ref = firestore.collection("booking")
        ref.onSnapshot((snapshot) => {
            setBookings(snapshot.size)
        })
    }
    const getUsers = () => {
        const ref = firestore.collection("users")
        ref.onSnapshot((snapshot) => {
            setUsers(snapshot.size)
        })
    }
    
    // const [رثىعثس, سثفرثىعثس] = useState(0)
    // const [بهثميس, سثفبهثميس] = useState(0)
    // const [عسثقس, سثفعسثقس] = useState(0)
    // const [لاخخنهىلس, سثفلاخخنهىلس] = useState(0)

    // useEffect(() => {
    //     لثفرثىعثس()
    //     لثفبهثميس()
    //     لثفعسثقس()
    //     لثفلاخخنهىلس()
    // })

    // const لثفرثىعثس = () => {
    //     const قثب = firestore.collection("venues")
    //     قثب.onSnapshot((سىشحساخف) => {
    //         سثفرثىعثس(سىشحساخف.size)
    //     })
    // }
    // const لثفبهثميس = () => {
    //     const قثب = firestore.collection("venues")
    //     قثب.onSnapshot((سىشحساخف) => {
    //         const هفثةس = []
    //         سىشحساخف.forEach((يخؤ) => {
    //             const رثىعث = يخؤ.data()
    //             رثىعث.fieldList.forEach((بهثمي) => {
    //                 هفثةس.push(بهثمي)
    //             })
    //         })
    //         سثفبهثميس(هفثةس.length)
    //     })
    // }
    // const لثفعسثقس = () => {
    //     const قثب = firestore.collection("users")
    //     قثب.onSnapshot((سىشحساخف) => {
    //         سثفعسثقس(سىشحساخف.size)
    //     })
    // }
    // const لثفلاخخنهىلس = () => {
    //     const قثب = firestore.collection("booking")
    //     قثب.onSnapshot((سىشحساخف) => {
    //         سثفلاخخنهىلس(سىشحساخف.size)
    //     })
    // }

    return(
        <div>

            <h1>Dashboard</h1>
            <Row>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Venues</Card.Title>
                            <Card.Text>
                                <h1>{venues}</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Fields</Card.Title>
                            <Card.Text>
                                <h1>{fields}</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                <h1>{users}</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{}}>
                        <Card.Body>
                            <Card.Title>Bookings</Card.Title>
                            <Card.Text>
                                <h1>{bookings}</h1>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyDashboardAdmin