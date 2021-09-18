import React from 'react';
import './TxtBox.css';

const TxtBox = ({ label, handleInput, placeholder }) => {
  return (
    <div className="txtBox">
      <div className="txtBoxContainer">
        <label>{label}</label>
        <input type="text" id={label} placeholder={placeholder} className="txtBoxInput" onChange={handleInput}></input>
      </div>
    </div>
  );
}

export default TxtBox;