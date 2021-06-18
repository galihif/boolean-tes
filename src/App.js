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
import VenueOwner from './pages/VenueOwner';
import VenueLogin from './pages/VenueLogin';
import VenueRegister from './pages/VenueRegister';
import VenueForm from './pages/VenueForm';
import JoinUs from './pages/JoinUs';


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
              <Route path="/joinus" component={JoinUs} />
              <Route path="/login" component={Login} />
              <Route path="/venuelogin" component={VenueLogin} />
              <Route path="/admin" component={Admin} />
              <Route path="/register" component={Register} />
              <Route path="/venueregister" component={VenueRegister} />
              <Route path="/venueform" component={VenueForm} />
              <Route path="/venuedetails/:id" exact component={VenueDetails} />
              <Route path="/profile/user/:id" exact component={Profile} />
              <Route path="/venuedashboard/:id" exact component={VenueOwner} />
            </Switch>
            <MyFooter />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
