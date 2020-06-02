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
const toggleInvestmentValidity = (req, res) => {
  const { investmentId } = req.params;
  // const currentUserId = req.authUser.id;

  Investment.findOne({ _id: investmentId })
    .then((investment) => {
      if (!investment) {
        return res.status(400).json({
          status: false,
          error: 'No such Investment is possible'
        });
      }
      // A valid investment exists
      // Toggle it
      investment.isVerified = !investment.isVerified;
      // Update investment
      investment.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed in verification investment'
          });
        }

        // Update
        return res.status(200).json({
          status: true,
          message: 'Investment verification completed',
          data: investment
        });
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

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
      // If an investment is edited,
      // Then it must need be approved by admin
       investment.isVerified = false;

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

const registerInvestment = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg)
    });
  }

  const { investmentId } = req.params;
  const currentUserId = req.authUser.id;

  Investment.findOne({ _id: investmentId })
    .then((investment) => {
      if (!investment) {
        return res.status(400).json({
          status: false,
          error: 'No such Investment is possible'
        });
      }
      // A valid investment exists

      const { units } = req.body;
      // Get other details from th investment
      // const unitCost = investment.unitCost;
      const currentInvestment = { investor: currentUserId, units };
      investment.investors = [...investment.investors, currentInvestment];
      // Update investment
      investment.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to register investment'
          });
        }

        // Update
        return res.status(200).json({
          status: true,
          message: 'Investment registered',
          data: investment
        });
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

// For a given investment, Who &  How many people has subscribed to it
// Get all users that has invested in this investment
// 1. if Admin => getAll
// 2. if investmentOwner => get investors of the investment he created
const getAllInvestmentSubscribers = (req, res) => {
  const { investmentId } = req.params;
  // const currentUserId = req.authUser.id;
  let filter = {
    _id: investmentId
  };

  if(!req.authUser.auth.includes('admin')){
    filter.owner = req.authUser.id
  }

  Investment.findOne(filter)
    .populate({
      path: 'investors.investor',
      select: ['firstname', 'lastname', 'phone'],
      model: User
    })
    .then((investment) => res.status(200).json({
      status: true,
      message: 'Investment investors list',
      data: investment
    }))
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get Investments'
    }));
};

module.exports = {
  createInvestment,
  updateInvestmentDetails,
  toggleInvestmentValidity,
  getInvestmentByFilter,
  getAllInvestmentSubscribers,
  registerInvestment
};
