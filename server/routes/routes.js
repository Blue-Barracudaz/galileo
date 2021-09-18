const router = require('express').Router();
const profile = require('./controllers/profile');
const getSpotsRoute = require('./controllers/getSpots').getSpotsRoute;
const profileRequests = require('./controllers/profileRequests');
const Spot = require('./controllers/manageSpots');
const booking = require('./controllers/postBooking');

console.log(Spot);

router.get('/profile', profileRequests.getProfile); // only for testing
router.get('/my-profile/:user_id', profile.getProfile);
router.post('/create-account', profile.createProfile);
router.put('/update-my-profile', profile.updateProfile);;
router.get('/spots', getSpotsRoute);
router.post('/login', profile.getUser);
router.get('/my-spots', Spot.getMySpots);
router.get('/spot-details', Spot.getSpotDetails);
router.put('/update-spot-details', Spot.updateSpotDetails);
router.post('/add-spot', Spot.addNewSpot);
router.get('/my-bookings', myBookingsRoute);
router.post('/booking', booking.postBooking);

module.exports = router;