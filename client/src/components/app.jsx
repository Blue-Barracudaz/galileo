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

  render() {
    return (
      <div>
        {/* <TabSelector></TabSelector> */}
        <PageHeader title={"TEMP TITLE"} isVisible={true} />
        <Profile type={'update'} />
        <MapView />
        <ManageSpots />
        <Profile type={'update'} />
        <Profile type={'regristration'} />
        <Login />
        <MyBookings userId={2}/>
      </div>
    )
  };
}

export default App;