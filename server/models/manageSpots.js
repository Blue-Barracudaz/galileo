const db = require('../../db/index.js').client;
// For Host - Spot Management

const getSpots = (userId) => {
  let query = `SELECT spot_id, address, price, photo_url FROM spots WHERE host_id = ${userId}`;
  return db.query(query)
    .then((results) => {
      // console.log('getting host myspots - models', results.rows)
      return results.rows;
    })
    .catch((err) => {
      console.log('error getting myspots - models', err);
    })
}

const addSpot = (options) => {
  let query = `INSERT INTO spots(host_id, lat, long, address, type, price, photo_url, geom) VALUES ('${options.hostId}', '${options.lat}', '${options.long}', '${options.address}', '${options.type}', '${options.price}', '${options.photo}', 'POINT(${options.lat} ${options.long})')`;
  return db.query(query)
    .then((results) => {
      // console.log('added new spot - models', results.rows)
      return results.rows;
    })
    .catch((err) => {
      console.log('error adding new spot - models', err);
    })
}

const getInfo = (spotId) => {
  let query = `SELECT address, type, price, photo_url FROM spots WHERE spot_id = ${spotId}`;
  return db.query(query)
    .then((results) => {
      // console.log('getting host spotinfo - models', results.rows)
      return results.rows;
    })
    .catch((err) => {
      console.log('error getting spotinfo - models', err);
    })
}

const updateInfo = (options) => {
  let query = `UPDATE spots SET photo_url='${options.photo}', type='${options.type}', price='${options.price}' WHERE spot_id = ${options.spotId}`;
  return db.query(query)
    .then((results) => {
      // console.log('updating host spotinfo - models', results)
      return results;
    })
    .catch((err) => {
      console.log('error updating spotinfo - models', err);
    })
}

module.exports = {
  getSpots,
  addSpot,
  getInfo,
  updateInfo
};