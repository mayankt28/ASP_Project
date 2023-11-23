const Building = require('../models/building');
const Floor = require('../models/floor');
const ErrorResponse = require('../utils/errorResponse');

// Controller function to handle GET request for buildings based on type
exports.getBuildingsByType = async (req, res, next) => {
  const { type } = req.params;

  try {
    const buildings = await Building.find({ type }).populate({
      path: 'floors',
      populate: { path: 'sensors' } // Populate sensors for each floor
    });

    if(!buildings) return new ErrorResponse("No Buildings Found", 404);

    res.json(buildings);
  } catch (error) {
    next(error);
  }
};

// Controller function to handle GET request for the building with least occupancy for a specific type
exports.getBuildingWithLeastOccupancy = async (req, res, next) => {
  const { type } = req.params;

  try {
    const buildingWithLeastOccupancy = await Building.findOne({ type }).populate({
      path: 'floors',
      options: { sort: { 'occupancy': 1 }, limit: 1 },
      populate: { path: 'sensors' } // Populate sensors for the floor with least occupancy
    });

    if (!buildingWithLeastOccupancy) {
        return new ErrorResponse("No Buildings Found", 404);
    }

    res.json(buildingWithLeastOccupancy);
  } catch (error) {
    next(error);
  }
};

exports.addNewBuilding = async (req, res, next) => {
    const { name, type, floors } = req.body;
  
    try {
      // Create a new building
      const newBuilding = new Building({
        name,
        type,
      });
  
      // Save the building to get its _id
      const savedBuilding = await newBuilding.save();
  
      // Create floors and sensors for the building
      const floorPromises = floors.map(async (floor) => {
        const newFloor = new Floor({
          floorNumber: floor.floorNumber,
          occupancy: floor.occupancy || 0,
          max: floor.max || 99,
          building: savedBuilding._id,
        });
  
        const savedFloor = await newFloor.save();
  
        // Create sensors for the floor
        if (floor.sensors && Array.isArray(floor.sensors)) {
          const sensorPromises = floor.sensors.map(async (sensor) => {
            const newSensor = new Sensor({
              sensorId: sensor.sensorId,
              floor: savedFloor._id,
              building: savedBuilding._id,
            });
  
            return await newSensor.save();
          });
  
          await Promise.all(sensorPromises);
        }
  
        return savedFloor;
      });
  
      // Wait for all floors to be saved
      const savedFloors = await Promise.all(floorPromises);
  
      // Update the building with the saved floors
      savedBuilding.floors = savedFloors.map(floor => floor._id);
      await savedBuilding.save();
  
      res.status(201).json(savedBuilding);
    } catch (error) {
      next(error);
    }
  };