import React from 'react';
import Login from './login/Login.jsx';
import Profile from './profile/Profile.jsx';
import PageHeader from './shared/pageHeader/pageHeader.jsx';
import './app.css';
import MapView from './mapview/MapView.jsx';
import BottomModal from './shared/bottomModal/BottomModal.jsx';
import ManageSpots from './spotManagement/ManageSpots.jsx';
import TabSelector from './shared/tabSelector/TabSelector.jsx'
import MyBookings from './myBookings/myBookings.jsx';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect
} from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      reservation: {}
    };
  }

  handleBookNow = (reservation) => {
    this.setState({
      reservation: reservation
    }, () => console.log('app-level reservation: ', this.state.reservation));
  }

  onIconClick = () => {
    console.log('HELLO')
  }

  // render() {
  //   return (
  //     <div>
  //       {/* <TabSelector></TabSelector> */}
  //       <PageHeader title={"TEMP TITLE"} isVisible={true} />
  //       <Profile type={'update'} />
  //       <MapView />
  //       <ManageSpots />
  //       <Login />
  //     </div>
  //   )
  // };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/registration">
              <Profile type={'registration'} />
            </Route>
            <Route path="/profile">
            {()=>(localStorage.getItem('user_id'))?<Profile type={'update'} />:<Redirect to='/'/>}
            </Route>
            <Route path="/rent">
              {()=>(localStorage.getItem('user_id'))?<MapView handleBookNow={this.handleBookNow}/>:<Redirect to='/'/>}
            </Route>
            <Route path="/host">
            {()=>(localStorage.getItem('user_id'))? <ManageSpots  />:<Redirect to='/'/>}
            </Route>
            {/* <Route path="/bookings">
              <Mybookings />
            </Route> */}


            {/* <Route path="/xxx">
              <ComponentXXX />
            </Route> */}

            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>

    )
  };

}

export default App;