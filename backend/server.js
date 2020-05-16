/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();


// express app
const app = express();

// database connection string
const url = '';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log('Database Connection Success');
}).catch((error) => {
  console.log('Database Connection Fail');
  console.log(error);
});

// express to parse json
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// handling cors errors
app.use(cors());

// global error handler
app.use(errorHandler);

// set port,listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
