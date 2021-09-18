
import React from 'react';
import style from './Registration.css'
import Button from '../shared/button/button.jsx';
import Login from '../login/Login.jsx';
import $ from 'jquery';
import TabSelector from '../shared/tabSelector/TabSelector.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      back:false
    }
  }

  componentDidMount() {

    if (this.props.btn === 'Save Information') {
      let user_id = localStorage.getItem('user_id')||1;
      // axios.get, db.getUser
      $.ajax({
        url: `http://localhost:3000/my-profile/${user_id}`,
        type: 'GET',
        success: (res) => {
          this.setState(res, () => console.log('GetExistingUser State: ', this.state));

        },
        error: (err) => {
          console.log('error',err);
        }
      })

    }
  }

  handleChange(){
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  // backtoLogin(){
  //   // console.log('backtoLogin');
  //   this.setState({back:true})
  // }

  submit(event) {
    event.preventDefault();
    this.props.handleUser(this.state);

  }

  showBacktoLogin(){
    if (this.props.btn === 'Finish Registration') {
      return (
        // <div className="backtoLogin" onClick={this.backtoLogin.bind(this)}>
        <div className="backtoLogin" onClick={() => {
          localStorage.removeItem('username');
          localStorage.removeItem('user_id');
        }}>
          <div className="backBtn">{'\u1438'} </div>
          {/* <div className="backWord"> Back to Login</div> */}
          <div className="backWord"> <Link to="/">Back to Login</Link></div>
        </div>
      )
    }
  }

  showSideBar(){
    if (this.props.btn === 'Save Information') {
      return (
        <TabSelector />
      )
    }
  }

  render() {
    // console.log(this.props)
    if (this.state.back)
      {return (
        <Login />
      )}

    let className, username, change;
    if (this.props.btn === 'Save Information') {
      className = 'updateContainer';
      username = localStorage.getItem('username') || ' ';
      change = () => console.log('username: ', username);
      // console.log('username:', username)
    } else {
      className = 'registrationContainer';
      username = this.state.username;
      change = this.handleChange.bind(this);
    }

    return (
      <div>
        <div className="registration">
          { this.showBacktoLogin() }
          <form onSubmit = {this.submit.bind(this)} className={className}>

            <label>Username</label>
            <input required type="text" id="username" className="registrationInput" value ={username} onChange={change} ></input>
            <label>Password</label>
            <input required type="text" id="password" className="registrationInput" value ={this.state.password} onChange={this.handleChange.bind(this)}></input>
            <label>Email</label>
            <input required type="email" id="email" className="registrationInput" value ={this.state.email} onChange={this.handleChange.bind(this)}></input>
            <label>First Name</label>
            <input required type="text" id="first_name" className="registrationInput" value ={this.state.first_name} onChange={this.handleChange.bind(this)}></input>
            <label>Last Name</label>
            <input required type="text" id="last_name" className="registrationInput" value ={this.state.last_name} onChange={this.handleChange.bind(this)} ></input>
            <input type="submit" className="registrationBtn" value={this.props.btn}/>

          </form>
        </div>
        { this.showSideBar() }
      </div>
    )
  }

}

export default Registration;