const { validationResult } = require('express-validator');
const User = require('../models/User');
const Investment = require('../models/Investment');
const Business = require('../models/Business');

// Create a new investment
// Get the User
// Find his business => ok => Create investment
const createInvestment = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg)
    });
  }
  // Passed all validations
  const owner = req.authUser.id;
  const {
    title, description, start_date, end_date, budget, unitCost, interest
  } = req.body;
  Business.findOne({ owner })
    .then((business) => {
      if (!business) return res.status(401).json({ status: false, error: 'You can only create an investment for a business' });

      // A Business exists
      // Create an investment
      const businessOwner = business._id;
      const investment = { businessOwner, owner };
      if (title) investment.title = title;
      if (description) investment.description = description;
      if (start_date) investment.start_date = start_date;
      if (end_date) investment.end_date = end_date;
      if (budget) investment.budget = budget;
      if (unitCost) investment.unitCost = unitCost;
      if (interest) investment.interest = interest;

      const newInvestment = new Investment(investment);
      newInvestment.save((err) => {
        if (err) return res.status(500).json({ status: false, error: 'Could not create a new investment' });

        return res.status(201).json({
          status: true,
          message: 'Investment Created',
          data: newInvestment
        });
      });
    })
    .catch((err) => res.status(500).json({ status: false, error: 'Failed to find your business' }));
};

// Super admin can toggle investments as valid or invalid
// By flipping the isverified key
const toggleInvestmentValidity = (req, res) => res.status(200).json({
  status: true,
  message: 'Investment working'
});

// When investment details are updated, isVerified is set to false
// Until admin verifies
const updateInvestmentDetails = (req, res) => {
  const owner = req.authUser.id;
  const { investmentId } = req.params;
  // Only one could be found & possible
  const filter = { owner, _id: investmentId, isDeleted: false };

  Investment.findOne(filter)
    .then((investment) => {
      if (!investment) {
        return res.status(400).json({
          status: false,
          error: 'You do not have any investment of sort'
        });
      }
      // Investment was found
      const {
        title, description, start_date, end_date, budget, unitCost, interest
      } = req.body;

      if (title) investment.title = title;
      if (description) investment.description = description;
      if (start_date) investment.start_date = start_date;
      if (end_date) investment.end_date = end_date;
      if (budget) investment.budget = budget;
      if (unitCost) investment.unitCost = unitCost;
      if (interest) investment.interest = interest;

      investment.save((err) => {
        if (err) return res.status(500).json({ status: false, error: 'Could not create a new investment' });

        return res.status(200).json({
          status: true,
          message: 'Investment Updated',
          data: investment
        });
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

const getInvestmentByFilter = (req, res) => {
  const filter = {};
  if (req.query.investmentId) filter._id = req.query.investmentId;
  if (req.query.isVerified) filter.isVerified = req.query.isVerified;
  if (req.query.businessOwner) filter.businessOwner = req.query.businessOwner;
  if (req.query.owner) filter.owner = req.query.owner;

  Investment.find(filter)
    .populate({
      path: 'businessOwner',
      select: ['name', 'cac_number', 'email', 'phone'],
      model: Business
    })
    .then((data) => {
      res.status(200).json({
        status: true,
        message: 'List of Investments on GoBusiness',
        data
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

module.exports = {
  createInvestment,
  updateInvestmentDetails,
  toggleInvestmentValidity,
  getInvestmentByFilter
};
