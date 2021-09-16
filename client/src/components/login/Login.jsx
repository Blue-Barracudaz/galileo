import React from 'react';
import './Login.css';
import LoginBox from './LoginBox.jsx';
import Profile from '../profile/Profile.jsx';
import MapView from '../mapview/MapView.jsx';
import 'regenerator-runtime/runtime';
const axios = require('axios');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      toRegister: false,
      username: '',
      password: '',
      message: ''
    }
  }

  componentDidMount() {
    let username = localStorage.getItem('username');
    if (username) {
      this.setState({ username: username });
    }
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async login() {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('/login', data)
      .then(result => {
        let newState;
        if (result.data === 'noExistUser') {
          newState = {
            username: '',
            password: '',
            message: 'Not an existing user! Try again!'
          }
        } else if (result.data.user_id) {
          localStorage.setItem('username', this.state.username);
          localStorage.setItem('user_id', result.data.user_id);
          newState = {
            showLogin: false
          };
        } else {
          newState = {
            password: '',
            message: 'Incorrect Password. Try again!'
          };
        }
        this.setState(newState);
      })
      .catch(err => {
        console.log('Login err: ', err);
      })
  }

  toRegister() {
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    this.setState({ showLogin: false, toRegister: true });
  }

  render() {

    if (this.state.showLogin) {
      return (
        <div id='background'>
          <div id='login'>
            <div id='name'>
              GALILEO
            </div>
            <LoginBox login={this.login.bind(this)} register={this.toRegister.bind(this)} handleChange={this.handleChange.bind(this)} username={this.state.username} password={this.state.password} placeholder={this.state.placeholder} message={this.state.message} />
          </div>
        </div>
      )
    } else if (this.state.toRegister) {
      return (
        <Profile type={'registration'} />
      );
    } else {
      return (
        <MapView />
      );
    }
  }
}

export default Login;