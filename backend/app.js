/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();
const initDB = require('./config/initDB');
// express app
const app = express();
// initialize & connect to Database
initDB();
// handling cors errors
app.use(cors());

// database connection string
// const url = 'mongodb://localhost:27017/gobusiness';
// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => {
//     console.log('Database Connection Success');
//   })
//   .catch((error) => {
//     console.log('Database Connection Fail');
//     console.log(error);
//   });

// express to parse json req.body
app.use(express.json({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
/** ****
 *  ROUTING
 *
 */
const authRoutes = require('./routes/authRoutes');
const businessRoute = require('./routes/businessRoute');
const investmentRoute = require('./routes/investmentRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/api/business', businessRoute);
app.use('/api/investments', investmentRoute);

app.use('/', (req, res) => res.status(200).json({
  status: true,
  message: 'GoBusiness is working'
}));

// global error handler
app.use(errorHandler);

// set port,listen for requests
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on PORT ${PORT}`);
// });
module.exports = app;
