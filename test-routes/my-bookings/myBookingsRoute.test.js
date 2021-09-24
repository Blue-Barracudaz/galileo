const supertest = require('supertest');
const app = require('../../server/server.js').app;
const request = supertest(app);
const db = require('../../db/index.js').client;

beforeEach(async () => {
  await db.query('DROP TABLE IF EXISTS spots');
  await db.query('DROP TABLE IF EXISTS bookings');
  // await db.query('CREATE EXTENSION postgis;');
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

  await db.query(`CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    spot_id integer,
    renter_id integer,
    start_time bigint,
    end_time bigint
    );`
  );

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761980, -122.502070, '1323 42nd Ave, San Francisco, CA 94122', 'driveway', 5, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761980 -122.502070)');`);

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761840, -122.502060, '1329 42nd Ave, San Francisco, CA 94122', 'driveway', 15, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761840 -122.502060)');`);

  await db.query(`INSERT INTO bookings (spot_id, renter_id, start_time, end_time) VALUES (1, 2, 1631314800, 1631318400)`);
})

afterAll(async () => {
  await db.end();
});

describe ('GET MY BOOKINGS', () => {

  it('should get a status code of 200 upon gettinga all bookings made by the user', async () => {
    let response = await request.get('/my-bookings/2')
    // console.log('MY-BOOKINGS ROUTE RESPONSE', response.body);
    expect(response.statusCode).toBe(200);
  })

  it('should get 1 booking made by the user', async () => {
    let response = await request.get('/my-bookings/2')
    // console.log('MY-BOOKINGS ROUTE RESPONSE', response.body);
    expect(response.body.length).toEqual(1);
  })
})