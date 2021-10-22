const client = require('../../db/index.js').client;

exports.getProfile = async (user_id) => {
  try {
    let query = `SELECT user_id,username,password,first_name,last_name ,email FROM users WHERE user_id = '${user_id}'`;
    let ans = await client.query(query);
    return ans.rows[0];
  } catch (error) {
  }
}

exports.createProfile = async (post) => {

  const {username,password,email,first_name,last_name}= post;
  let query = `INSERT INTO users (user_id,username, password, first_name, last_name, email) VALUES (default,'${username}','${password}','${first_name}','${last_name}','${email}')  ON CONFLICT (username) DO NOTHING`;
  try {
    let ans = await client.query(query);
    return ans;
  } catch (error) {
    throw error;
  }
}

exports.updateProfile = async (post,user_id) =>{
  const {username,password,email,first_name,last_name}= post;
  try {
    let query = `UPDATE users
    SET username = '${username}',
    password='${password}',
    first_name='${first_name}',
    last_name='${last_name}',
    email='${email}'
    WHERE user_id = ${user_id} `;
    let ans = await client.query(query);
    return ans;
  } catch (error) {
    throw error;
  }
}


exports.getUser = async (username) => {
  let query = `SELECT user_id, password FROM users where username='${username}';`;
  try {
    let user = await client.query(query);
    return user.rows[0];
  } catch (err) {
    console.log('err from models: ', err);
  }
};


