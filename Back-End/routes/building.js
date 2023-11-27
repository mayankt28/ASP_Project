const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { getBuildingWithLeastOccupancy, getBuildingsByType, addNewBuilding } = require('../controllers/building');

router.route('/getBuildingByType/:type').get(protect, getBuildingsByType);
router.route('/getBuildingWithLeastOccupancy/:type').get(protect, getBuildingWithLeastOccupancy);
router.route('/addBuilding').post(addNewBuilding);

module.exports = router;