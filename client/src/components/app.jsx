import React from 'react';
import Login from './login/Login.jsx';
import Profile from './profile/Profile.jsx';
import PageHeader from './shared/pageHeader/pageHeader.jsx';
import './app.css';
import MapView from './mapview/MapView.jsx';
import BottomModal from './shared/bottomModal/BottomModal.jsx';
import ManageSpots from './spotManagement/ManageSpots.jsx';
import TabSelector from './shared/tabSelector/TabSelector.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
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
              <Profile type={'update'} />
            </Route>
            <Route path="/rent">
              <MapView />
            </Route>
            <Route path="/host">
              <ManageSpots  />
            </Route>
            <Route path="/bookings">
              <Mybookings />
            </Route>

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