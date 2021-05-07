import React from 'react'
import MyNavbar from './components/MyNavbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MyAboutUs from './components/MyAboutUs';
import Home from './pages/Home';

import Venues from './pages/Venues';
import MyFooter from './components/MyFooter';
import VenueDetails from './pages/VenueDetails';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="">
        <MyNavbar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/venues" component={Venues} />
          <Route path="/about" component={MyAboutUs}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/venuedetails/:id" exact component={VenueDetails}/>
        </Switch>
        <MyFooter/>
      </div>
    </Router>
    
  );
}

export default App;
