const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

//Import controllers below
const { getUserDetails, updateUserDetails, fetchHostedTournaments, fetchRegisteredTournaments } = require('../controllers/user');

router.route('/getuserdetails').get(protect, getUserDetails);
router.route('/updateuserdetails').put(protect, updateUserDetails);
router.route('/hostedtournaments').get(protect, fetchHostedTournaments);
router.route('/registeredtournaments').get(protect, fetchRegisteredTournaments);

module.exports = router;