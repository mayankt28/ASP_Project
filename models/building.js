const mongoose = require('mongoose');


// Building Schema
const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['study', 'sports', 'gym', 'entertainment', 'relax', 'food', 'administrative', 'office'],
  },
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Floor' }], // Reference to Floor model
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building ;
