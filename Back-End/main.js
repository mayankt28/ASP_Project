//Envionment Variable
require("dotenv").config({ path: './config.env'});

const errorHandler = require('./middleware/error');


//Database Connection
const connectDB = require("./config/db");
connectDB();

const express = require("express");
const expressWs = require('express-ws');
const mqtt = require('mqtt');
const app = express();
expressWs(app);
const cors = require('cors');
const port = process.env.PORT || 3000;
const sensorController = require('./controllers/sensor');


//import routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const buildingRouter = require('./routes/building');
const sensorRouter = require('./routes/sensor');


app.use(express.json());
app.use(cors())
app.use('/static', express.static('public'));

app.get('/', (req,res) => {
    res.send("<h1>ASP Project</h1>")
})

//connection routes
app.use('/api/auth', authRouter);
app.use('/api/user/', userRouter);
app.use('/api/building/', buildingRouter);
app.use('/api/sensor/', sensorRouter);


//middleware
app.use(errorHandler)

app.ws('/ws', (ws, req) => {
    console.log('WebSocket connection established');
  
    // Handle WebSocket messages
    ws.on('message', (msg) => {
      console.log(`WebSocket message received: ${msg}`);
      // Handle the WebSocket message as needed
    });
  });
  



j=app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    j.close(() => process.exit(1));
  });

 