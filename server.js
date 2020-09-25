const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

//connect to mongo Database 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
             { useNewUrlParser: true }
             );
             console.log(`MongoDB connected ${conn.connection.host}`)
      } catch (error) {
        console.log(error);
        process.exit(1);
        //0 - successful termination
        //1 - abnormal -termination 
      }
}

export default connectDB;