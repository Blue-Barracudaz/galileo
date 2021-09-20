const models = require('../../models/index.js');

const getFreeSpotsRoute = (req, res) => {
  console.log('req.query:', req.query);
  return models.getFreeSpots(req.query.lat, req.query.lng, req.query.start, req.query.end)
    .then((spots) => {
      res.status(200).send(spots);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

module.exports.getFreeSpotsRoute = getFreeSpotsRoute;