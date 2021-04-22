import React,{ Component } from 'react'
import { Button, Jumbotron, CardDeck, Card} from 'react-bootstrap';

import './Home.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from './molecule/MyNavbar';
import MyHero from './molecule/MyHero';
import MyCat from './molecule/MyCat';

class Home extends Component{
    render(){
        return(
            <div>
                <MyNavbar/>
                <MyHero/>
                <MyCat/>

                <div className="about-container">
                    
                </div>
            </div>
        )
    }
}

export default Home