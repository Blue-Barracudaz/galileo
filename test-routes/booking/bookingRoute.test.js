const app = require('../../server/server.js').app;
const db = require('../../db/index.js').client;
const request = require('supertest')(app);

beforeEach(async () => {
  await db.query('DROP TABLE if exists bookings');
  await db.query(`CREATE TABLE bookings (
      booking_id SERIAL PRIMARY KEY,
      spot_id integer,
      renter_id integer,
      start_time bigint,
      end_time bigint
    );`
  );
})

afterAll(async () => {
  await db.end();
});

describe ('Post a booking', () => {
  it('should respond with a status of 201', async () => {
    let booking = {
      spot_id: 27,
      renter_id: 3,
      start_time: '1631750952568',
      end_time: '1631750989351'
    }
    let response = await request.post('/booking').send(booking)
    expect(response.statusCode).toBe(201);

    let getBooking = await db.query(`SELECT * FROM bookings`)
    booking['booking_id'] = 1;
    expect(getBooking.rows[0]).toEqual(booking);
  });

  it('should respond with a status of 500', async () => {
    let booking = {
      spot_id: 27,
      renter_id: 3,
      start_time: '1631750952568',
    }
    let response = await request.post('/booking').send(booking)
    expect(response.statusCode).toBe(500);
  })
});
