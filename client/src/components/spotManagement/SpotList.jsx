import React from 'react';
import Spot from './Spot.jsx';
import './spotManagement.css';


const SpotList = (props) => {
  return (
    <div className='spot-list'>
      {props.spots.map((spot, id) => <Spot id={spot.spot_id} key={id} handleSpotClick={props.handleSpotClick} address={spot.address} price={spot.price} photo={spot.photo_url}/>)}
    </div>
  );
}


export default SpotList;