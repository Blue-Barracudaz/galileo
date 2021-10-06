const model = require('../../models/manageSpots.js');
const AWS = require('aws-sdk');
const multiparty = require('multiparty');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const getMySpots = (req, res) => {
 model.getSpots(req.query.id)
   .then((spots) => {
     res.status(200);
     res.send(spots)
   })
   .catch((err) => {
     console.log('error getting spots from models');
     res.sendStatus(404)
   })
}

const addNewSpot = (req, res) => {
 // req.body = { hostId:   , lat:    , long:     , price:    , address:   , type:    , photo:    }
 model.addSpot(req.body)
   .then(() => {
     res.sendStatus(201);
   })
   .catch((err) => {
     console.log('error posting new spot - controller', err);
     res.sendStatus(404)
   })
}

const getSpotDetails = (req, res) => {
  // req.query.id = spotid
  model.getInfo(req.query.id)
   .then((info) => {
     res.status(200);
     res.send(info);
   })
   .catch((err) => {
     console.log('error getting spot details from models', err);
     res.sendStatus(404)
   })
}

const updateSpotDetails = (req, res) => {
  // req.body = { photo:   , type:    , spotId:     , price:    }
  model.updateInfo(req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error updating spot details - controller', err);
      res.sendStatus(404);
    })

}

const uploadImage = (req, res) => {
  const form = new multiparty.Form();

  form.on('part', function(part) {
    const params = {
      Bucket: 'galileo-boc',
      Key: `${Date.now()}`,
      Body: part,
      ContentType:'image/jpeg'
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('error adding img to s3', err);
        res.sendStatus(400);
      } else {
        res.status(201);
        res.send(data.Location);
      }
    })
  });


  form.parse(req);
}

module.exports = {
  getMySpots,
  addNewSpot,
  getSpotDetails,
  updateSpotDetails,
  uploadImage
}