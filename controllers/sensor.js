const mqtt = require('mqtt');
const Sensor = require('../models/sensor');
const Floor = require('../models/floor');

const mqttBroker = 'broker.hivemq.com';
const mqttPort = 8000;  // port for MQTT over WebSocket
const mqttTopic = 'ADD_TOPIC_HERE';  // Same as the topic in the Python script

// Create MQTT client
const mqttClient = mqtt.connect(`ws://${mqttBroker}:${mqttPort}`);

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

// Connect to MQTT broker
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(mqttTopic);
});

module.exports = mqttClient;  // Export the MQTT client for use in other files
