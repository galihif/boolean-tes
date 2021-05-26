import React, { useEffect,useState } from 'react'
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import firebase from '../config/firebase'

import './MyFieldCard.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyFieldCardAdmin = (props) => {
    const [showDialog, setShowDialog] = useState(false)
    const [time1, setTime1] = useState(0)
    const [time2, setTime2] = useState(0)
    const [hours, setHours] = useState(0)
    const [date, setDate] = useState(0)
    const [userId, setUserId] = useState("")
    const [timeNow, setTimeNow] = useState("")

    useEffect(() => {
        getDateTime()
        getUser()
        if (time1 !== 0 && time2 !== 0){
            var array1 = time1.split(":");
            var seconds1 = (parseInt(array1[0], 10) * 60 * 60) + (parseInt(array1[1], 10) * 60)


            var array2 = time2.split(":");
            var seconds2 = (parseInt(array2[0], 10) * 60 * 60) + (parseInt(array2[1], 10) * 60)

            setHours(Math.ceil((seconds2 - seconds1) / 3600))
        }
    }, [time1,time2,hours,date])

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "time1":
                setTime1(e.target.value)
                break
            case "time2":
                setTime2(e.target.value)
                break
            case "date":
                setDate(e.target.value)
                break
            default:
                return null
        }
    }

    const handleSubmit = () => {
        getDateTime()
        pushBooking()
    }

    const pushBooking = () => {
        let ref = firebase.firestore().collection("booking").doc()
        let bookId = ref.id
        firebase.firestore().collection("booking").doc(bookId).set({
            bookTime: timeNow,
            date: date,
            fieldName: props.fieldName,
            isCompleted: false,
            fieldPrice: props.fieldPrice,
            time: `${time1} - ${time2}`,
            userId: userId,
            venueId: props.venueData.venueId,
            venueName: props.venueData.venueName,
            id: bookId

        }).then(() => {
            console.log('success')
            toggleDialog()
        }).catch((err) => {
            console.log(err)
        })
    }

    const getDateTime = () => {
        let date = new Date()
        let fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        setTimeNow(fullDate)
    }

    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // setLoading(true)
            if (user) {
                setUserId(user.uid)
            } else {
                // No user is signed in.
            }

        })
    }

    return (
        <div className="field-card">
            <Card class="card">
                <div class="card-horizontal">
                    <div class="img-square-wrapper">
                        <Card.Img variant="top" src={props.fieldImage} />
                    </div>
                    <Card.Body className="p-4">
                        <Row className="d-flex justify-content-lg-between">
                            <Col lg>
                                <Card.Title>
                                    {props.fieldName}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Sport : {props.sportType}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Field : {props.fieldType}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Floor : {props.floorType}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Price : Rp. {props.fieldPrice}/hour
                                </Card.Subtitle>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
            </Card>

        </div>
    )
}

export default MyFieldCardAdmin