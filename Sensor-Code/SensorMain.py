import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

# HiveMQ Test Server details
broker_address = "broker.hivemq.com"
port = 1883
topic = "ADD_Topic_HERE"

# Trigger pins for both sensors
trigger_pin1 = 15
trigger_pin2 = 27

# Echo Pins for both sensors
echo_pin1 = 6
echo_pin2 = 23

threshold = 50 # Not the right value...needs to be changed :)
sequence = ""
filter = 5

# Set trigger pins as output
GPIO.setup(trigger_pin1, GPIO.OUT)
GPIO.setup(trigger_pin2, GPIO.OUT)

# Set echo pins as input
GPIO.setup(echo_pin1, GPIO.IN)
GPIO.setup(echo_pin2, GPIO.IN)

# Give sensors time to calibrate
GPIO.output(trigger_pin1, False)
GPIO.output(trigger_pin2, False)
time.sleep(2)

# Function to measure distance
def measureDistance(trigger, echo):

    GPIO.output(trigger, True)
    time.sleep(0.00001)
    GPIO.output(trigger, False)

    while GPIO.input(echo) == 0:
        pulse_start = time.time()

    while GPIO.input(echo) == 1:
        pulse_stop = time.time()

    pulse_duration = pulse_stop - pulse_start

    distance = pulse_duration * 17150
    distance = round(distance, 2)

    return distance

#Function to filter out noise from sensor data
def noiseReducer(distanceFunction, trigger, echo, filterStrength):
    output = 0
    for i in range(filterStrength):
        output += distanceFunction(trigger, echo)

    output = output/filterStrength
    return output

# Callback when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
    else:
        print("Failed to connect, return code %d\n", rc)

# Callback when a message is published
def on_publish(client, userdata, mid):
    print("Message Published")

# Create an MQTT client instance
client = mqtt.Client()

# Assign the callback functions
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the broker
client.connect(broker_address, port, 60)

# Wait for the connection to establish
client.loop_start()

# Driver Code Starts Here
try:

    while True:

        sensorOneData = noiseReducer(measureDistance, trigger_pin1, echo_pin1, filter)
        sensorTwoData = noiseReducer(measureDistance, trigger_pin2, echo_pin2, filter)

        if sensorOneData < threshold:
            print("Sensor 1 Triggered: ", sensorOneData)
            sequence += '1'

        if sensorTwoData < threshold:
            print("Sensor 2 Triggered: ", sensorTwoData)
            sequence += '2'

        if len(sequence) == 2:

            if sequence == "12":
                message = "Entry Detected"
                print(message)
                client.publish(topic, message)
                time.sleep(1)

            elif sequence == "21":             
                message = "Exit Detected"
                print(message)
                client.publish(topic, message)
                time.sleep(1)

            else:
                print("Invalid Sequence: ", sequence)

            sequence = ""
            time.sleep(0.5)

except KeyboardInterrupt:
    print("Exiting...: ")

finally:
    GPIO.cleanup()
    client.disconnect()