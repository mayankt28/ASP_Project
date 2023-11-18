const mongoose = require('mongoose');

// Sensor Schema
const sensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true,
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
  },
  // Additional sensor properties can be added here
});

const Sensor = mongoose.model('Sensor', sensorSchema);



module.exports = Sensor;
