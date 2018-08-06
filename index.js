const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

//setup environment variables
dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

//routers
const petRouter = require('./routers/pets');

// setup our port
const port = process.env.PORT || 8008;

// power ups (middleware)
server.use(helmet());
server.use(morgan("combined"));
server.use(bodyParser.json());  //accept json data
server.use(bodyParser.urlencoded({ extended: true }));  //accept html form data

//routes
server.use(petRouter);

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});