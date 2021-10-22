import React from 'react';
import Map from './map.jsx';
import Search from './Search.jsx';
import BottomModal from '../shared/bottomModal/BottomModal.jsx';
import ModalContent from './ModalContent.jsx';
import TabSelector from '../shared/tabSelector/TabSelector.jsx'
import {
  withRouter
} from "react-router-dom";

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.7749,
        lng: -122.4194
      },
      UNIXstart: null,
      UNIXend: null,
      reservationStartTime: null,
      reservationEndTime: null,
      reservationStartDate: null,
      reservationEndDate: null,
      spots: [],
      selectedSpot: '',
      showBottomModal: false,
      spotSelected: false,
    };
    this.getFreeSpots = this.getFreeSpots.bind(this);
    this.getFreeSpotsAndUpdate = this.getFreeSpotsAndUpdate.bind(this);
    this.openBottomModal = this.openBottomModal.bind(this);
    this.closeBottomModal = this.closeBottomModal.bind(this);
    this.selectSpot = this.selectSpot.bind(this);
  }

  getFreeSpots(lat, lng, start, end) {
    return fetch(`http://localhost:3000/spots?lat=${lat.toString()}&lng=${lng.toString()}&start=${start.toString()}&end=${end.toString()}`)
    .then((resp) => resp.json())
    .catch((err) => {
      console.log('ERROR GETTING SPOTS', err);
    })
  }

  getFreeSpotsAndUpdate(lat, lng, UNIXstart, UNIXend, startTime, endTime, startDate, endDate) {
    this.getFreeSpots(lat, lng, UNIXstart, UNIXend)
      .then((spots) => {
        this.setState({
          center: {
            lat: lat,
            lng: lng
          },
          spots: spots,
          reservationStartTime: startTime,
          reservationEndTime: endTime,
          reservationStartDate: startDate,
          reservationEndDate: endDate,
          UNIXstart: UNIXstart,
          UNIXend: UNIXend
        }, () => console.log('map component state after get request: ', this.state));
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      })
  }

  openBottomModal() {
    if (!this.state.showBottomModal) {
      this.setState({
        showBottomModal: true
      });
    }
  }

  closeBottomModal() {
    this.setState({
      showBottomModal: false,
      spotSelected: false
    });
  }

  selectSpot(spot) {
    this.setState({
      selectedSpot: spot,
      spotSelected: true,
    });
  }

  render() {
    return (
      <div className="map-view" style={{ width: "100vw", height: "100vh" }}>
        <TabSelector view={0}/>
        <Map
          center={this.state.center}
          spots={this.state.spots}
          selectSpot={this.selectSpot}
          spotSelected={this.state.spotSelected}
          openBottomModal={this.openBottomModal}
          searchMade={this.state.reservationStartTime}
        />
        <Search
          searchMade={this.state.reservationStartTime}
          spotsFound={this.state.spots.length === 1 ? '1 nearby spot' : `${this.state.spots.length} nearby spots`}
          getFreeSpotsAndUpdate={this.getFreeSpotsAndUpdate}
        />
        <BottomModal
          isModalOpen={this.state.showBottomModal}
          modalContent={<ModalContent
            handleBookNow={this.props.handleBookNow}
            address={this.state.selectedSpot.address}
            price={this.state.selectedSpot.price}
            photo={this.state.selectedSpot.photo_url}
            spot_id={this.state.selectedSpot.spot_id}
            reservationStartTime={this.state.reservationStartTime}
            reservationEndTime={this.state.reservationEndTime}
            reservationStartDate={this.state.reservationStartDate}
            reservationEndDate={this.state.reservationEndDate}
            UNIXstart={this.state.UNIXstart}
            UNIXend={this.state.UNIXend}
          />}
          onModalClose={this.closeBottomModal}
        />
      </div>
    );
  }
};

export default withRouter(MapView);