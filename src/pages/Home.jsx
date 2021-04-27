import React,{ Component } from 'react'
import { Button, Jumbotron, CardDeck, Card} from 'react-bootstrap';

import './Home.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyHero from '../components/MyHero';
import MyCat from '../components/MyCat';
import MyAboutUs from '../components/MyAboutUs';
import MyFooter from '../components/MyFooter';

class Home extends Component{
    render(){
        return(
            <div>
                <MyHero/>
                <MyCat/>
                <MyAboutUs/>
            </div>
        )
    }
}

export default Home