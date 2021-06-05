import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './config/store'

import MyAboutUs from './components/MyAboutUs';
import Home from './pages/Home';
import MyNavbar from './components/MyNavbar';
import Venues from './pages/Venues';
import MyFooter from './components/MyFooter';
import VenueDetails from './pages/VenueDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="">
            <MyNavbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/venues/search/:keyword" exact component={Venues} />
              <Route path="/venues/cat/:cat" exact component={Venues} />
              <Route path="/venues" component={Venues} />
              <Route path="/about" component={MyAboutUs} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Admin} />
              <Route path="/register" component={Register} />
              <Route path="/venuedetails/:id" exact component={VenueDetails} />
              <Route path="/profile/user/:id" exact component={Profile} />
            </Switch>
            <MyFooter />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
