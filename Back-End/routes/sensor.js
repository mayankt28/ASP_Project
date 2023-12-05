const express = require('express');
const router = express.Router();

const { addSensorToFloor } = require('../controllers/sensor');

router.route('/addSensorToFloor').post(addSensorToFloor);

module.exports = router;