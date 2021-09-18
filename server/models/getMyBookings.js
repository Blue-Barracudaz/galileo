const client = require('../../db/index.js').client;

const getMyBookings = (id) => {
  let query = `SELECT bookings.booking_id, bookings.renter_id, bookings.start_time, bookings.end_time, spots.spot_id,spots.host_id, spots.lat, spots.long, spots.address, spots.type, spots.price, spots.photo_url from bookings left outer join spots ON (bookings.spot_id=spots.spot_id) where bookings.renter_id=$1 ORDER BY bookings.booking_id;`;
  let values = [id];

  return client.query(query, values)
    .then((bookings) => {
      console.log('MODELS: MY BOOKINGS', bookings.rows);
      return bookings.rows;
    })
    .catch((err) => {
      console.log('MODELS ERROR GETTING MY BOOKINGS FROM DB', err);
      throw err;
    })
}

module.exports.getMyBookings = getMyBookings;