const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// start app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database mongo
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// load models
const Champions = require('./models/champions');

// Load routes
const indexRoutes = require('./routes');
app.use('/', indexRoutes);

const championsRoutes = require('./routes/champions');
app.use('/champions', championsRoutes);

module.exports = app;