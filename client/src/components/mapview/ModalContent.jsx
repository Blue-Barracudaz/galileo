import React from 'react';
import Button from '../shared/button/button.jsx'
import './ModalContent.css';

export default ({ address, price, photo }) => (
  <div id="modal-content-container">
    <div id="modal-content-info-container">
      <div id="modal-content-image-container">
        <img src={photo}/>
      </div>
      <div id="modal-content-spot-info-container">
        <div>{address}</div>
        <div>{`$${price}/hr`}</div>
      </div>
    </div>
    <div id="modal-content-button-container">
      <Button text={'Book Now'} func={() => console.log('link to booking page...')}/>
    </div>
  </div>
);