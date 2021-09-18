import React from 'react';
import axios from 'axios';
import SpotList from './SpotList.jsx';
import Button from '../shared/button/button.jsx';
import './spotManagement.css';
import PageHeader from '../shared/pageHeader/pageHeader.jsx';
import UpdateSpot from './UpdateSpot.jsx';
import AddSpot from './AddSpot.jsx';

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
    // get all spots from server for current user/host
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
    // jump to edit spot page
    this.setState({
      updateSpot: true,
      currentSpotId: id
    }, () => console.log(this.state));
  }

  handleAddSpotClick(e) {
    // jump to add spots page
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

    let mainContent =
      <div className='manage-spots-home' >
        <div className='my-spots-container'>
          <SpotList spots={this.state.spots} handleSpotClick={this.handleSpotClick} />
        </div>
        <div className='button-container'>
          <Button func={this.handleAddSpotClick} text={'Add Spot'} />
        </div>
      </div>;

    if (this.state.addSpot) {
      mainContent = <AddSpot resetHomePage={this.resetHomePage} id={this.state.userId} />
    }
    if (this.state.updateSpot) {
      mainContent = <UpdateSpot resetHomePage={this.resetHomePage} id={this.state.currentSpotId} />
    }

    return (
      <div>
        {mainContent}
      </div>
    );

  }
}

export default ManageSpots;