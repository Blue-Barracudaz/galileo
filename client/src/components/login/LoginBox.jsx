import React from 'react';
import style from './LoginBox.css'
import Profile from '../profile/Profile.jsx';

import {
  Link
} from "react-router-dom";

const axios = require('axios');

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="login-container">
          <form className="login-box" onSubmit={this.props.login}>
            <input required type="text" id="username" className="login-input" name="username" value ={this.props.username} placeholder="Username" onChange={this.props.handleChange}></input><br></br>
            <input required type="password" className="login-input" name="password" value ={this.props.password} placeholder="Password" onChange={this.props.handleChange}></input><br></br>
            <input type="submit" className="login-Btn" value='LOGIN'></input>
            <p id="to-register" className="to-register"><Link to="/registration">Create an Account</Link></p>
            <p id="login-msg" className="login-msg">{this.props.message}</p>
          </form>
        </div>
      )

  }
}

export default LoginBox;
