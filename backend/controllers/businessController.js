const { validationResult } = require('express-validator');
const User = require('../models/User');
const Business = require('../models/Business');

// Register a new business on GoBusiness
// Confirm that the owner does not exist yet
// No User should have more than one registered business
const createBusiness = (req, res) => {
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
    name, description, address, email, phone, cac_number, website
  } = req.body;
  // Confirm that user has not created any business yet
  Business.findOne({ owner })
    .then((businessData) => {
      if (businessData) return res.status(401).json({ status: false, error: 'You can only register one business' });
      // User has not registered any business
      // register his business
      const business = { owner };
      if (name) business.name = name;
      if (description) business.description = description;
      if (address) business.address = address;
      if (cac_number) business.cac_number = cac_number;
      if (website) business.website = website;
      if (email) business.email = email;
      if (phone) business.phone = phone;

      const newBusiness = new Business(business);
      newBusiness.save((err) => {
        if (err) return res.status(500).json({ status: false, error: 'Internal Server Error: Failed to save new Business' });

        return res.status(201).json({
          status: true,
          message: 'Created new Business',
          data: newBusiness
        });
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get business'
    }));
};

// Update a business details on GoBusiness
const updateBusiness = (req, res) => {
  const owner = req.authUser.id;
  const { businessId } = req.params;
  const {
    name, description, address, email, phone, cac_number, website
  } = req.body;
  // Find the business that is owned by that user
  Business.findOne({ owner, _id: businessId })
    .then((businessData) => {
      if (!businessData) return res.status(401).json({ status: false, error: 'You can only update your business' });

      // User has found his business
      // update it his business
      if (name) businessData.name = name;
      if (description) businessData.description = description;
      if (address) businessData.address = address;
      if (cac_number) businessData.cac_number = cac_number;
      if (website) businessData.website = website;
      if (email) businessData.email = email;
      if (phone) businessData.phone = phone;

      // Update by saving the new details
      businessData.save((err) => {
        if (err) return res.status(500).json({ status: false, error: 'Internal Server Error: Failed to update Business' });

        return res.status(200).json({
          status: true,
          message: 'Business data updated',
          data: businessData
        });
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get business'
    }));
};

// Get a list of registered business on GoBusiness
// Populate owner
const getBusinessByFilter = (req, res) => {
  const filter = {};
  if (req.query.businessId) filter._id = req.query.businessId;
  if (req.query.ownerId) filter.owner = req.query.ownerId;

  Business.find(filter)
    .populate({
      path: 'owner',
      select: ['firstname', 'lastname', 'email', 'phone'],
      model: User
    })
    .then((data) => {
      res.status(200).json({
        status: true,
        message: 'List of business/SMEs on GoBusiness',
        data
      });
    })
    .catch((err) => res.status(500).json({
      status: false,
      errors: 'Failed to get businessListing'
    }));
};

module.exports = {
  createBusiness,
  updateBusiness,
  getBusinessByFilter
};
