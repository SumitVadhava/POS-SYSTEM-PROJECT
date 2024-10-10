const mongoose = require('mongoose');
require('colors');
require('dotenv').config();

// import database url from the env file
const dbconnection = process.env.db_url;

// connect with the database
const dbconnect = ()=>{
    mongoose.connect(dbconnection,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Connected with database successfully");
    })
    .catch((error)=>{
        console.log("Failed  to connect with the database");
        console.error(error.message);
        process.exit(1);
    
    });
} 
module.exports = dbconnect;