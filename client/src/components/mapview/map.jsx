import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";

const containerStyle = {
  width: '100%',
  height: '80%'
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    }
  }

  onClick = (spot) => {
    this.setState({selected: spot});
    this.props.selectSpot(spot);
    this.props.openBottomModal(); //TODO this could be improved by not opening the modal if it's already open...
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_API}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.props.center}
          zoom={16}
        >
          {
            this.props.spots.map((spot) => {
              return (
                <Marker
                  key={spot.spot_id}
                  icon={this.props.spotSelected && this.state.selected.spot_id === spot.spot_id ? {url: './markerActive.png'} : {url: './marker.png'}}
                  position={spot.location}  // TODO update positioning of custom marker icon
                  onClick={() => this.onClick(spot)}
                />
              )
            })
          }
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapContainer;