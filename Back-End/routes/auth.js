const express = require('express');
const router = express.Router();

//Import controllers
const { register, 
        login, 
        forgetPassword,
        resetPassword 
    } = require('../controllers/auth');


//Routes
router.route('/register').post(register); 
router.route('/login').post(login);
router.route('/forgetpassword') .post(forgetPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);

module.exports = router;