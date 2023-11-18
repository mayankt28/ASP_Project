//Envionment Variable
require("dotenv").config({ path: './config.env'});

const errorHandler = require('./middleware/error');


//Database Connection
const connectDB = require("./config/db");
connectDB();

const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//import routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const buildingRouter = require('./routes/building');

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


//middleware
app.use(errorHandler)



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    app.close(() => process.exit(1));
  });