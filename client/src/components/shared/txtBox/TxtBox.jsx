import React from 'react';
import './TxtBox.css';

const TxtBox = ({ label, handleInput, placeholder, type = "text" }) => {
  return (
    <div className="txtBox">
      <div className="txtBoxContainer">
        <label>{label}</label>
        <input type={type} id={label} placeholder={placeholder} className="txtBoxInput" onChange={handleInput}></input>
      </div>
    </div>
  );
}

export default TxtBox;