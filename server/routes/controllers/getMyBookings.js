const models = require('../../models/index.js');

const getMyBookingsRoute = (req, res) => {
  return models.getMyBookings()
    .then((bookings) => {
      console.log('CONTROLLER: MY BOOKINGS', bookings)
      res.status(200).send(bookings)
    })
    .catch ((err) => {
      console.log('CONTROLLER: ERROR GETTING MY BOOKINGS FROM DB', err)
      res.sendStatus(500);
    })
};

module.exports.getMyBookingsRoute = getMyBookingsRoute;