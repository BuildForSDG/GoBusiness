const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Investment = require('../models/Investment');

// Get a list of all Users as requested by ADMIN
const getAllUsers = (req, res) => {
  User.find({})
    .select('-password')
    .then((users) => res.status(200).json({ status: true, message: 'Users List', data: users }))
    .catch((err) => res.status(500).json({ status: false, error: 'Server error:: Could not retrieve users' }));
};

const manageUserPassword = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg)
    });
  }
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (!user) return res.status(401).json({ status: false, error: 'User record does not exist' });

    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate salt' });

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to hash password' });

        user.password = hash;
        user.save((err) => {
          if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to save user', user });

          return res.status(200).json({
            status: true,
            message: 'User password updated successful',
            data: user
          });
        });
      });
    });
  });
};

const toggleAdmin = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        res.status(400).json({ status: false, error: 'No such user exists' });
      }

      // User exists
      // If user is already admin, revoke prividge
      // Otherwise, enable priviledge
      if (user.auth.includes('admin')) {
        user.auth = user.auth.filter((auth) => auth !== 'admin');
      } else {
        user.auth = [...user.auth, 'admin'];
      }
      user.save((err) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not resave users' });

        return res.status(200).json({
          status: true,
          message: 'Admin auth changed',
          data: user
        });
      });
    })
    .catch((err) => res.status(500).json({ status: false, error: 'Server error:: Could not retrieve users' }));
};

// Get the investments that a User has invested in
// Given the Userid, find all his investments
// Find my investments
const getCurrentUserInvestments = (req, res) => {
  const currentUserId = req.authUser.id;

  Investment.find({
    'investors.investor': currentUserId
  })
    .populate({
      path: 'investors.investor',
      select: ['firstname', 'lastname', 'phone'],
      model: User
    })
    .then((investments) => res.status(200).json({
      status: true,
      message: 'List of all your investments',
      data: investments
    }))
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

const deleteUsersById = (req, res) => {
  const { userId } = req.params;

  User.findOneAndDelete({ _id: userId }, (err, user) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not delete users' });

    return res.status(200).json({ status: true, message: 'User deleted', data: userId });
  });
};
module.exports = {
  manageUserPassword,
  toggleAdmin,
  getAllUsers,
  getCurrentUserInvestments,
  deleteUsersById
};
