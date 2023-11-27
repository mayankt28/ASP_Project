const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect(process.env.DATABASE_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
    },(err) => {
        if(err){
            console.error(err.message);
        }
        else{
            console.log("Database Connected !")
        }
    });
   
}

module.exports = connectDB;