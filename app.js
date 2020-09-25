const express = require('express');
const morgan = require('morgan');
const connectDB  = require('./config/db');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.promise = global.promise;

connectDB();
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'));  
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1/', require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`server started.... at ${process.env.PORT}..`);
})

