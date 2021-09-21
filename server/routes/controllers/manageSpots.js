const model = require('../../models/manageSpots.js');
const fs = require('fs');
const AWS = require('aws-sdk');
const multiparty = require('multiparty');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const getMySpots = (req, res) => {
 // req.query.id = hostid
 model.getSpots(req.query.id)
   .then((spots) => {
    //  console.log('getting spots back to controller', spots);
     res.status(200);
     res.send(spots)
   })
   .catch((err) => {
     console.log('error getting spots from models');
   })
}

const addNewSpot = (req, res) => {
 // req.body = { hostId:   , lat:    , long:     , price:    , address:   , type:    , photo:    , }
 model.addSpot(req.body)
   .then(() => {
    //  console.log('success adding new post - controller');
     res.sendStatus(201);
   })
   .catch((err) => {
     console.log('error posting new spot - controller', err);
   })
}

const getSpotDetails = (req, res) => {
  // req.query.id = spotid
  model.getInfo(req.query.id)
   .then((info) => {
    //  console.log('getting spots details to controller', info);
     res.status(200);
     res.send(info);
   })
   .catch((err) => {
     console.log('error getting spot details from models', err);
   })
}

const updateSpotDetails = (req, res) => {
  // req.body = { photo:   , type:    , spotId:     , price:    }
  console.log('body', req.body);
  model.updateInfo(req.body)
    .then(() => {
      // console.log('success updating spot details - controller');
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error updating spot details - controller', err);
    })

}

const uploadImage = (req, res) => {
  // upload to s3
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
        res.sendStatus(500)
      } else {

        console.log('success adding image', data)
        // get url
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