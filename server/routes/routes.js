const router = require('express').Router();
const Profile = require('./controllers/Profile');
const getFreeSpotsRoute = require('./controllers/getSpots').getFreeSpotsRoute;

const profileRequests = require('./controllers/profileRequests');
const { getUser } = require('./controllers/getUser');
const Spot = require('./controllers/manageSpots')
const myBookingsRoute = require('./controllers/getMyBookings.js').getMyBookingsRoute;
const booking = require('./controllers/postBooking');

console.log(Spot);

router.get('/profile', profileRequests.getProfile); // only for testing
router.get('/my-profile/:user_id', Profile.getProfile);
router.post('/create-account', Profile.createProfile);
router.put('/update-my-profile', Profile.updateProfile);;
router.get('/spots', getFreeSpotsRoute);
router.post('/login', Profile.getUser);
router.get('/my-spots', Spot.getMySpots);
router.get('/spot-details', Spot.getSpotDetails);
router.put('/update-spot-details', Spot.updateSpotDetails);
router.post('/add-spot', Spot.addNewSpot);
router.post('/uploadImage', Spot.uploadImage)
router.get('/my-bookings/:user_id', myBookingsRoute);
router.post('/booking', booking.postBooking);

module.exports = router;