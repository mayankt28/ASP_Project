
const Sensor = require('../models/sensor');
const Floor = require('../models/floor');
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
                var floor = Floor.findById(sensor.flooor);
    
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

module.exports = mqttClient;  // Export the MQTT client for use in other files
