import React,{useState,useEffect} from 'react'
import { Modal, Container, Tab, Row, Nav, Image, Card, Table, Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import firebase,{firestore} from '../config/firebase'

const MyUserAdmin = () => {
    const [users, setUsers] = useState([])
    const [venueId, setVenueId] = useState("")
    const [showDialog, setShowDialog] = useState(false)
    let history = useHistory()
    let { path, url } = useRouteMatch()

    useEffect(() => {
        getVenues()
    })

    const getVenues = () => {
        const ref = firebase.firestore().collection("users")
        ref.onSnapshot((snapshot) => {
            const items = []
            snapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setUsers(items)
        })
    }

    const handleAddVenue = () => {
        history.push(`${url}/add-venue`)
    }

    
    const toggleDialog = (id) => {
        setShowDialog(!showDialog)
        setVenueId(id)
    }
    return(
        <div>
            <div className="venues-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? (
                                users.map((user) => {
                                    return(
                                        <tr>
                                            <td>{user.userId}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.joinedAt}</td>
                                        </tr>
                                    )
                                })
                            ) : null
                        }
                    </tbody>
                </Table>

            </div>
            <br />
            <br />
        </div>
    )
}

export default MyUserAdmin