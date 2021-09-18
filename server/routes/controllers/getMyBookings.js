const models = require('../../models/index.js');

const getMyBookingsRoute = (req, res) => {
  let id = Number(req.params.user_id);

  return models.getMyBookings(id)
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