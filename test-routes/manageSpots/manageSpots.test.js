const app = require('../../server/server.js').app;
const db = require('../../db/index.js').client;
const request = require('supertest')(app);

beforeEach(async () => {
  await db.query('DROP TABLE IF EXISTS spots');
  await db.query('DROP TABLE IF EXISTS users');

  await db.query(`CREATE TABLE spots (
    spot_id SERIAL PRIMARY KEY,
    host_id integer,
    lat decimal,
    long decimal,
    address varchar(100),
    type varchar(50),
    price integer,
    photo_url text,
    geom GEOMETRY(Point)
    );`
  );

  // await db.query(`CREATE TABLE users (
  //   user_id SERIAL PRIMARY KEY,
  //   username varchar(50) UNIQUE,
  //   password varchar(50),
  //   first_name varchar(50),
  //   last_name varchar(50),
  //   email varchar(50)
  // );`
);

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761980, -122.502070, '1323 42nd Ave, San Francisco, CA 94122', 'driveway', 5, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761980 -122.502070)');`);

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761840, -122.502060, '1329 42nd Ave, San Francisco, CA 94122', 'driveway', 15, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761840 -122.502060)');`);

})

afterAll(async () => {
  await db.end();
});