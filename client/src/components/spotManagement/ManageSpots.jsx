import React from 'react';
import axios from 'axios';
import SpotList from './SpotList.jsx';
import Button from '../shared/button/button.jsx';
import './spotManagement.css';
import PageHeader from '../shared/pageHeader/pageHeader.jsx';
import UpdateSpot from './UpdateSpot.jsx';
import AddSpot from './AddSpot.jsx';
import {withRouter} from "react-router-dom";
import TabSelector from '../shared/tabSelector/TabSelector.jsx';

class ManageSpots extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: localStorage.getItem('user_id') || null,
      spots: [],
      addSpot: false,
      updateSpot: false,
      currentSpotId: null
    }

    this.handleSpotClick = this.handleSpotClick.bind(this);
    this.handleAddSpotClick = this.handleAddSpotClick.bind(this);
    this.getAllHostSpots = this.getAllHostSpots.bind(this);
    this.resetHomePage = this.resetHomePage.bind(this);
  }

  componentDidMount() {
    this.getAllHostSpots(this.state.userId);
  }

  getAllHostSpots(id) {
    axios.get(`http://localhost:3000/my-spots?id=${id}`)
      .then((results) => {
        console.log('results');
        this.setState({ spots: results.data }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log('fetching error', err);
      })
  }

  handleSpotClick(id) {
    this.setState({
      updateSpot: true,
      currentSpotId: id
    }, () => console.log(this.state));
  }

  handleAddSpotClick(e) {
    this.setState({
      addSpot: true,
    });
  }

  resetHomePage() {
    this.setState({
      addSpot: false,
      updateSpot: false,
      currentSpotId: null
    }, this.getAllHostSpots(this.state.userId));
  }

  render() {

    let tabBar = (this.state.addSpot || this.state.updateSpot) ? null : <TabSelector view={1}/>;

    let mainContent =
      <div className='manage-spots-home' >
        <PageHeader title={'Spot Management'} linkto='/rent' />
        <div className='my-spots-container'>
          <SpotList spots={this.state.spots} handleSpotClick={this.handleSpotClick} />
        </div>
        <div className='button-container'>
          <Button func={this.handleAddSpotClick} text={'Add Spot'} height={'6vh'} width={'75%'} />
        </div>
      </div>;

    if (this.state.addSpot) {
      mainContent = <AddSpot resetHomePage={this.resetHomePage} id={this.state.userId} />
    }
    if (this.state.updateSpot) {
      mainContent = <UpdateSpot resetHomePage={this.resetHomePage} id={this.state.currentSpotId} />
    }

    return (
      <div className='host-home'>
        {tabBar}
        {mainContent}
      </div>
    );

  }
}


export default withRouter(ManageSpots);
