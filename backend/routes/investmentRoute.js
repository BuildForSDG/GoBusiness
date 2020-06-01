const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const {
  createInvestment,
  updateInvestmentDetails,
  toggleInvestmentValidity,
  getInvestmentByFilter
} = require('../controllers/investmentController');
const checkAuth = require('../middleware/checkAuth');

/** *
 * @route GET /api/investments
 * @desc Get All investments by a given filter
 * @access public
 */
router.get('/', getInvestmentByFilter);

/** *
 * @route POST /api/investments
 * @desc Add a new investments
 * @access private
 */
router.post(
  '/',
  [
    check('title', 'Investment title is required').notEmpty(),
    check('description', 'Investment description is required').notEmpty(),
    check('start_date', 'Investment start date is required').notEmpty(),
    check('end_date', 'Investment end date is required').notEmpty(),
    check('budget', 'Investment budget is required').notEmpty(),
    check('unitCost', 'Investment cost per unit is required').notEmpty(),
    check('interest', 'Investment returns is required').notEmpty()
  ],
  checkAuth,
  createInvestment
);

/** *
 * @route PUT /api/investments/:investmentId
 * @desc Update an investments
 * @access public
 */
router.put('/:investmentId', checkAuth, updateInvestmentDetails);

/** *
 * @route GET /api/investments/:investmentId/validity
 * @desc Get All investments
 * @access public
 */
router.put('/:investmentId/validity', toggleInvestmentValidity);
module.exports = router;
