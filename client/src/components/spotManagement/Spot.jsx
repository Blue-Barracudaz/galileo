import React from 'react';
import ChevronRight from '../shared/icons/chevronRight.jsx';
import './spotManagement.css';

const Spot = (props) => {

  let imageSource;
  if (props.photo === '') {
    imageSource = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
  } else {
    imageSource = props.photo;
  }

  return (
    <div className='spot-card'>
      <div className='spot-photo'>
        <img className='card-photo' src={imageSource}></img>
      </div>
      <div className='spot-card-info'>
        <div className='spot-address'>{props.address}</div>
        <div className='spot-price'>${props.price}/hr</div>
      </div>
      <ChevronRight size={100} onIconClick={() => props.handleSpotClick(props.id)}/>
    </div>
  );

}




export default Spot;