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

function App() {
  return (
    <Router>
      <div className="">
        <MyNavbar/>
        <Switch>
          <Route path="/about">
            <MyAboutUs/>
          </Route>
          <Route path="/venues">
            <Venues/>
          </Route>
          <Route path="/venuedetails">
            <VenueDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <MyFooter/>
      </div>
    </Router>
    
  );
}

export default App;
