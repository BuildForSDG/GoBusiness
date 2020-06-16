const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const signup = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg)
    });
  }

  // Passed all validations
  const {
    firstname, lastname, phone, email, password
  } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (user) return res.status(400).json({ status: false, error: 'User record already exist' });

    // new User
    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      password
    });
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate salt' });

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to hash password' });

        newUser.password = hash;
        newUser.save((err) => {
          if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to save user' });

          const payload = { id: newUser._id, auth: newUser.auth };
          jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 60 }, (err, token) => {
            if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

            return res.status(201).json({
              status: true,
              message: 'User signup successful',
              token
            });
          });
        });
      });
    });
  });
};
const login = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg)
    });
  }


  // Passed all validations
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (!user) return res.status(403).json({ status: false, error: 'Account does not exist' });

    // User has account
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to compare password' });

      if (!isMatch) return res.status(401).json({ status: false, error: 'Account does not exist' });

      const payload = { id: user._id, auth: user.auth };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 60 }, (err, token) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

        return res.status(200).json({
          status: true,
          message: 'User login successful',
          token
        });
      });
    });
  });
};
const getUserByToken = (req, res) => {
  const currentUserId = req.authUser.id;
  const filter = { _id: currentUserId };
  User.findOne(filter, '-password', (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (!user) return res.status(400).json({ status: false, error: 'No such record found' });

    // User found
    const data = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      auth: user.auth
    };
    return res.status(200).json({
      status: true,
      message: 'User records',
      data
    });
  });
};

module.exports = {
  signup,
  login,
  getUserByToken
};
