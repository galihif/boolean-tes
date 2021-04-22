import React, { } from 'react'
import { Button} from 'react-bootstrap';
import './MyButton.scss'

const MyButton = (props) => {
    return(
        <Button className={props.type} variant={props.theVariant} >{props.title}</Button>
    )
}

export default MyButton