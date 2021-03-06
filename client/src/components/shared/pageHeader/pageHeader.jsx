import React from 'react';
import './pageHeader.css';
import { Link } from "react-router-dom";


const PageHeader = ({ title, isVisible = true, isBackButtonVisible = false, linkto = "/"}) => {

  if (isVisible) {
    return (
      <div className="page-header">
        {isBackButtonVisible? <div className="page-header-back"><Link to={linkto} className="page-header-back-link">{'\u1438'}</Link></div> : <div></div>}
        {/* <h1 style={{ fontSize: "2vh" }}>{title.toUpperCase()}</h1> */}
        <h1 className="header">{title.toUpperCase()}</h1>
      </div>
    );
  } else {
    return (<div></div>);
  }

}

export default PageHeader;