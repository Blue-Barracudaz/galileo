const models = require('../../models/index.js');

const getSpotsRoute = (req, res) => {
  return models.getSpots()
    .then((spots) => {
      console.log('SPOTS CONTROLLER', spots)
      res.status(200).send(spots)
    })
    .catch ((err) => {
      console.log('ERRRO GETTING SPOTS FROM DB IN CONTROLLER', err)
      res.sendStatus(500);
    })
};

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

module.exports.getSpotsRoute = getSpotsRoute;
module.exports.getFreeSpotsRoute = getFreeSpotsRoute;