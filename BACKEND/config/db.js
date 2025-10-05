const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log("Database connected");
    })
}

module.exports = connectDB;