const app = require('../../server/server.js').app;
const db = require('../../db/index.js').client;
const request = require('supertest')(app);

beforeEach(async () => {
  await db.query('DROP TABLE IF EXISTS spots');

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

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761980, -122.502070, '1323 42nd Ave, San Francisco, CA 94122', 'driveway', 5, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761980 -122.502070)');`);

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761840, -122.502060, '1329 42nd Ave, San Francisco, CA 94122', 'driveway', 15, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761840 -122.502060)');`);

  await db.query(`INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.762565959993495, -122.50153009990579, '4055 Irving St, San Francisco, CA 94122', 'driveway', 14, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.762565959993495 -122.50153009990579)')`)

})

afterAll(async () => {
  await db.end();
});

describe('get host spots', () => {

  it('should return a 200 status code on success', async () => {
    let response = await request.get('/my-spots?id=1');
    expect(response.statusCode).toBe(200);
  });

  it('should return all spots for given user', async () => {
    let response1 = await request.get('/my-spots?id=1');
    expect(response1.body.length).toBe(2);
    let response2 = await request.get('/my-spots?id=2');
    expect(response2.body.length).toBe(1);
  });
});

describe('get spot details', () => {
  it('should send 200 status code on success', async () => {
    let response = await request.get('/spot-details?id=3');
    expect(response.statusCode).toBe(200);
  });

  it('should return details for parking spot', async () => {
    let response = await request.get('/spot-details?id=3');
    expect(response.body[0].price).toBe(14);
    expect(response.body[0].type).toBe('driveway');
    expect(response.body[0].address).toBe('4055 Irving St, San Francisco, CA 94122');
    expect(response.body[0].photo_url).toBe('https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778');
  });
});

describe('update spot details', () => {

  it('should send 204 status code on success', async () => {
    let response = await request.put('/update-spot-details').send({price: 100})
    expect(response.statusCode).toBe(204);
  });

  it('should update spot info', async () => {
    let options = {
      spotId: 1,
      price: 50,
      type: 'garage',
      photo: 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778'
    };

    let response1 = await request.get('/spot-details?id=1');
    expect(response1.body[0].price).toBe(5);
    expect(response1.body[0].type).toBe('driveway');
    await request.put('/update-spot-details').send(options);
    let response2 = await request.get('/spot-details?id=1');
    expect(response2.body[0].price).toBe(50);
    expect(response2.body[0].type).toBe('garage');
  });
});


describe('add new spot', () => {

});
describe('upload image', () => {

});

