import React, { useState, useEffect } from 'react';

export default function Picker({ label, options, initialValue, onChangeCB = () => { } }) {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    onChangeCB(selectedOption);
  }, [selectedOption]);

  return (
    <div className="Picker">
      <label>{label}</label>
      <select value={selectedOption} onChange={handleSelectChange}
        style={{
          backgroundColor: 'white',
          borderColor: "#CDC4F2",
          borderWidth: '3px',
          borderRadius: '8px',
        }}>
        {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
      </select>
    </div>
  );
}