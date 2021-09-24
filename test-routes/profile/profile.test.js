const supertest = require('supertest');
const app = require('../../server/server.js').app;
const request = supertest(app);
const db = require('../../db/index.js').client;

beforeEach(async () => {
  await db.query('DROP TABLE if exists users');
  await db.query(`CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username varchar(50) UNIQUE,
      password varchar(50),
      first_name varchar(50),
      last_name varchar(50),
      email varchar(50)
    );`
  );

  let insert = await db.query(`INSERT INTO users (username, password, first_name, last_name, email) VALUES ('owner1','1234','owner1','owner1','owner1@g.com') RETURNING username`)


})

afterAll(async () => {
  await db.end();
});

describe ('GET USERS', () => {
  it('CHECKING USERS', async () => {
    let response = await request.get('/my-profile/1')

    expect(response.statusCode).toBe(201);
  })
})

describe ('Create a new user', () => {
  it('should respond with a status of 201', async () => {
    let user = {
      username: 'owner2',
      password: 'owner2',
      first_name: 'owner2',
      last_name: 'owner_2',
      email: 'owner2@g.com'
    }
    let response = await request.post('/create-account').send(user)
    // console.log('NEW USER2', response.body);
    expect(response.statusCode).toBe(201);

    let getUserResponse = await request.get('/my-profile/2');
    // console.log('USER 2', getUserResponse.body);
    expect(getUserResponse.body.username).toEqual('owner2');
    // user['password']='owner3';
    let updateresponse = await request.put('/update-my-profile').send(user)
    // console.log('NEW USER2', response.body);
    expect(updateresponse.statusCode).toBe(500);
  })
})

describe ('Login a user', () => {
  it('should respond with the initial user', async () => {

    let loginuser = {
      username: 'owner1',
      password: '1234'
    }
    let getUserresponse = await request
    .post('/login')
    .send(loginuser);
    expect(getUserresponse.statusCode).toBe(200);
    expect(getUserresponse.body.user_id).toEqual(1);
    expect(getUserresponse.body.password).toEqual('1234');


  })

  it('should not respond with the new user', async () => {

    let loginuser = {
      username: 'owner2',
      password: 'owner2'
    }
    let getUserresponse = await request
      .post('/login')
      .send(loginuser);
      expect(getUserresponse.statusCode).toBe(200);
      expect(getUserresponse.text).toEqual('noExistUser');

    })

  it('should respond with incorrect password', async () => {

    let loginuser = {
      username: 'owner1',
      password: '123'
    }
    let getUserresponse = await request
    .post('/login')
    .send(loginuser);
    expect(getUserresponse.statusCode).toBe(200);
    expect(getUserresponse.text).toEqual('failLogin');

  })

})