import React from 'react';
import './TabSelector.css';
import {
  withRouter,
  Link,
} from "react-router-dom";



class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isActive
    }
  }


  render() {
    return (
      <img className="icon"
        id={this.props.id}
        src={this.props.isActive ? `${this.props.activeState}` : `${this.props.inactiveState}`}></img>
    );
  }


}

// Hardcoded images is obv not best practice, but we have a deadline
class TabSelector extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="tab-selector">
        <div className="tab-selector-body">
          <Link className="icon" to="/rent"><Icon id={0} isActive={this.props.view == 0} activeState={'./rentActive.png'} inactiveState={'./rentInactive.png'} /></Link>
          <Link className="icon" to="/host"><Icon id={1} isActive={this.props.view == 1} activeState={'./spotsActive.png'} inactiveState={'./spotsInactive.png'} /></Link>
          <Link className="icon" to="/profile"><Icon id={2} isActive={this.props.view == 2} activeState={'./profileActive.png'} inactiveState={'./profileInactive.png'} /></Link>
          <Link className="icon" to="/bookings"><Icon id={3} isActive={this.props.view == 3} activeState={'./bookingsActive.png'} inactiveState={'./bookingsInactive.png'} /></Link>
        </div>
      </div>

    );
  }
}

export default withRouter(TabSelector);