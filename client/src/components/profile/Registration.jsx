
import React from 'react';
import style from './Registration.css'
import Button from '../shared/button/button.jsx';
import Login from '../login/Login.jsx';
import PageHeader from '../shared/pageHeader/pageHeader.jsx';
import $ from 'jquery';
import TabSelector from '../shared/tabSelector/TabSelector.jsx'
import {
  withRouter,
  Link,
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

  submit(event) {
    event.preventDefault();
    this.props.handleUser(this.state);

  }

  showBacktoLogin(){
    if (this.props.btn === 'Finish Registration') {
      return (
        <div className="backtoLogin" onClick={() => {
          localStorage.removeItem('username');
          localStorage.removeItem('user_id');
          this.props.history.push('/');
        }}>
          <div className="backBtn">{'\u1438'} </div>
          {/* <div className="backWord"> <Link to="/">Back to Login</Link></div> */}
          <div className="backWord"> Back to Login</div>
        </div>
      )
    }
  }

  showSideBar(){
    if (this.props.btn === 'Save Information') {
      return (
        <TabSelector view={2}/>
      )
    }
  }

  showLogout(){
    if (this.props.btn === 'Save Information') {
      return (
        <div>
          <PageHeader title={'Profile Information'} />
          <div className="logOut" onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');
          }}>
            <div className="logOutWord"> <Link to="/">Log Out</Link></div>
          </div>
        </div>
      )
    }
  }

  render() {


    let className, username, change;
    if (this.props.btn === 'Save Information') {
      className = 'updateContainer';
      username = localStorage.getItem('username') || ' ';

    } else {
      className = 'registrationContainer';
      username = this.state.username;

    }

    return (
      <div>
        { this.showLogout()}
        <div className="registration">
          { this.showBacktoLogin() }
          <form onSubmit = {this.submit.bind(this)} className={className}>

            <label>Username</label>
            <input required type="text" id="username" className="registrationInput" value ={username} onChange={this.handleChange.bind(this)} disabled={this.props.btn === 'Save Information'}></input>
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