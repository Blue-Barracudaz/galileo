import React from 'react';
import './pageHeader.css';


const PageHeader = ({ title, isVisible = true }) => {

  if (isVisible) {
    return (
      <div className="page-header">
        {/* <h1 style={{ fontSize: "2vh" }}>{title.toUpperCase()}</h1> */}
        <h1 className="header">{title.toUpperCase()}</h1>
      </div>
    );
  } else {
    return (<div></div>);
  }

}

export default PageHeader;