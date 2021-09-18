import React from 'react';
import './myBookingsHeader.css';

let MyBookingsHeader = ({ heading }) => {
  return (
    <div className='my-bookings-header'>
      <div className="back">{'\u1438'} </div>
      <div className='heading'>
        {heading}
      </div>
    </div>
  )
};

export default MyBookingsHeader;