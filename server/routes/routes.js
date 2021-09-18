const router = require('express').Router();
const Profile = require('./controllers/Profile');
const getSpotsRoute = require('./controllers/getSpots').getSpotsRoute;
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
// router.get('/spots', getSpotsRoute);
router.get('/spots', getFreeSpotsRoute);  // I added this
router.post('/login', getUser);
router.get('/my-spots', Spot.getMySpots);
router.get('/spot-details', Spot.getSpotDetails);
router.put('/update-spot-details', Spot.updateSpotDetails);
router.post('/add-spot', Spot.addNewSpot);
router.get('/my-bookings/:user_id', myBookingsRoute);
router.post('/booking', booking.postBooking);

module.exports = router;