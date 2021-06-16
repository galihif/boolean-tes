import React,{ Component } from 'react'

import './Home.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyHero from '../components/MyHero';
import MyCat from '../components/MyCat';
import MyAboutUs from '../components/MyAboutUs';

class Home extends Component{
    componentDidMount(){
        document.title = "Boolean - Home"
    }
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