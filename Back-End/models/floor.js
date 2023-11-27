const mongoose = require('mongoose');


const floorSchema = new mongoose.Schema({
    floorNumber: {
      type: Number,
      required: true,
    },
    occupancy: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }], // Reference to Sensor model
  
  });

  const Floor = mongoose.model('Floor', floorSchema);

  module.exports = Floor;