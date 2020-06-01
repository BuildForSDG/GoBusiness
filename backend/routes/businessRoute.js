const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const { createBusiness, updateBusiness, getBusinessByFilter } = require('../controllers/businessController');
const checkAuth = require('../middleware/checkAuth');

/** *
 * @route POST /api/business
 * @desc Create a new business
 * @access private => for now
 */
router.post(
  '/',
  [
    check('name', 'Business name is required').notEmpty(),
    check('description', 'Business description is required').notEmpty(),
    check('address', 'Business address is required').notEmpty(),
    check('email', 'Business email is required').isEmail(),
    check('phone', 'Phone number is required').notEmpty(),
    check('cac_number', 'CAC number is required').notEmpty()
  ],
  checkAuth,
  createBusiness
);

/** *
 * @route PUT /api/business/:businessId
 * @desc Update a  business
 * @access private => for now
 */
router.put('/:businessId', checkAuth, updateBusiness);

/** *
 * @route GET /api/business
 * @desc Get a  business
 * @access private => for now
 */
router.get('/', getBusinessByFilter);
module.exports = router;
