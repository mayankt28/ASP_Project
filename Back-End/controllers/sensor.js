
const Sensor = require('../models/sensor');
const mongoose = require('mongoose');
const Floor = require('../models/floor');
const Building = require('../models/building')
const mqtt = require('mqtt');

const mqttTopic = "/ASPSensorData"
const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

mqttClient.on('connect', () => {
    console.log('Connected to HiveMQ broker');
    mqttClient.subscribe(mqttTopic);
  });
  
  mqttClient.on('error', (error) => {
    console.error('MQTT connection error:', error);
  });
  
  mqttClient.on('close', () => {
    console.log('Disconnected from HiveMQ broker');
  });




// Handle MQTT messages


mqttClient.on('message', async (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    try {

        if(topic == mqttTopic) {

            var sensorId = message.toString().split("-")[0];
            var action = message.toString().split("-")[1];
            sensor = await Sensor.findOne({ sensorId });
    
            if(sensor) {
                var floor = await Floor.findById(sensor.floor);
    
                if(floor) {
                    if(action == "ENTRY") {

                        floor.occupancy += 1;
                        await floor.save();

                    }

                    if(action == "EXIT") {

                        floor.occupancy -= 1;
                        await floor.save();

                    }
                }
                
                else {
                    console.log("Floor not found");
                }
            }

            else {
                console.log("sensor not found");
            }
        }
    }

    catch(err) {
        console.log("Error: ", err);
    }

});

// Test Code Below

/*

mqttClient.on('message', async (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

*/


// Endpoint to add sensor data
exports.addSensorToFloor =  async (req, res, next) => {
  try {
    const { sensorId, floorId, buildingId } = req.body;

    // Check if the floor and building exist
    const floorExists = await Floor.exists({ _id: mongoose.Types.ObjectId(floorId) });
    const buildingExists = await Building.exists({ _id: mongoose.Types.ObjectId(buildingId) });

    if (!floorExists || !buildingExists) {
      return res.status(400).json({ message: 'Invalid floor or building ID' });
    }

    const newSensorData = {
      sensorId,
      floor: floorId,
      building: buildingId,
    };

    const sensor = new Sensor(newSensorData);
    await sensor.save();

    await Floor.updateOne({ _id: mongoose.Types.ObjectId(floorId) }, { $push: { sensors: sensor._id } });

    res.status(201).json({ message: 'Sensor data added successfully', sensor });
  } 
  catch (error) {
    next(error);
  }
}





