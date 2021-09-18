import React from 'react';
import './parkingSpot.css';

let ParkingSpot = ({ image, rate, address, date, time, total, onIconClick, ActionIcon }) => {
  return (
    <div className='spot'>
      <div className='spot-photo'>
        <img src={image}/>
      </div>

      <div className='spot-info'>
        <p>{address} </p>
        <p className='rate'> {date} </p>
        <p className='rate'> {time} </p>
        <p className='rate'> Total: ${total} </p>
        <p className='rate'>{rate} </p>
      </div>

      <div className='spot-arrow'>
        <ActionIcon size={70} color={'#707070'} onIconClick={onIconClick}/>
      </div>
    </div>
  );
}

export default ParkingSpot;