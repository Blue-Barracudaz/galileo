import React from 'react';
import style from './Registration.css'
import Registration from './Registration.jsx';
import $ from 'jquery';

const Profile = ({ type }) => {
  let btn, handleUser, addUser, getUser, updateUser;
  addUser = (data) => {
    $.ajax({
      url: 'http://localhost:3000/create-account',
      type: 'POST',
      data: data,
      success: (res) => {
        if (res.rowCount === 1) {
          alert("success");
        } else if (res.rowCount === 0) {
          alert("Uesrname already exists");
        }
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  getUser = () => {
    console.log('Update! GetUser!');
    let user_id = localStorage.getItem('user_id') || 1;
    $.ajax({
      url: `http://localhost:3000/my-profile/${user_id}`,
      type: 'GET',
      success: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  updateUser = (data) => {
    console.log('update', data)
    let user_id = localStorage.getItem('user_id') || 1;
    $.ajax({
      url: `http://localhost:3000/update-my-profile`,
      type: 'PUT',
      data: {user_id, ...data},
      success: (res) => {
        console.log('rws', res)
        if (res.rowCount === 1) {
          alert("success");
        } else if (res.rowCount === 0) {
          alert("Uesrname already exists");
        }
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  if (type === 'registration') {
    btn = "Finish Registration";
    handleUser = addUser;
  }

  if (type === 'update') {
    btn = "Save Information";
    handleUser = updateUser;
  }

  return (
    <Registration btn={btn} handleUser={handleUser} updateUser={updateUser} />
  );
}

export default Profile;