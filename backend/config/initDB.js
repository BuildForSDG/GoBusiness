const mongoose = require('mongoose');

const initDB = async () => {
  const testURI = process.env.MONGODBURI_TEST || 'mongodb://localhost:27017/gobusiness_test';
  const appURI = process.env.MONGODBURI || 'mongodb://localhost:27017/gobusiness';
  const URI = process.env.NODE_ENV === 'test' ? testURI : appURI;
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('connect to DB::', URI);
  } catch (err) {
    if (err) return console.log('Failed to connect to DB::', err);
  }

  // mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, db) => {
  //   if (err) return console.log('Failed to connect to DB::', err);

  //   console.log('DB connected successfully :: ', db.client.s.url);
  // });
};

module.exports = initDB;
