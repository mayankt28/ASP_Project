const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

//Import controllers below
const { getUserDetails, updateUserDetails } = require('../controllers/user');

router.route('/getuserdetails').get(protect, getUserDetails);
router.route('/updateuserdetails').put(protect, updateUserDetails);


module.exports = router;