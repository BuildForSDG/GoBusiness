const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();
const {
  createInvestment,
  updateInvestmentDetails,
  toggleInvestmentValidity,
  getInvestmentByFilter,
  registerInvestment,
  getAllInvestmentSubscribers
} = require('../controllers/investmentController');

/** *
 * @route GET /api/investments
 * @desc Get All investments by a given filter
 * @access public
 */
router.get('/', getInvestmentByFilter);

/** *
 * @route PUT /api/investments/:investmentId/subscription
 * @desc register an investors investment
 * @access private
 */
router.put(
  '/:investmentId/subscriptions',
  [check('units', 'Units of investment is required').notEmpty()],
  checkAuth,
  registerInvestment
);

/** *
 * @route GET /api/investments/:investmentId/investors
 * @desc Get all users that has invested in this investment
 * @access private
 */
// Get the details of the investors of this investment
//
// 1. if Admin => getAll
// 2. if investmentOwner => get investors of the investment he created
router.get('/:investmentId/investors', checkAuth, getAllInvestmentSubscribers);

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
 * @route PUT /api/investments/:investmentId/invest
 * @desc Users can Invest
 * @access private
 */
router.put('/:investmentId/invest', checkAuth, registerInvestment);

/** *
 * @route GET /api/investments/:investmentId/validity
 * @desc Flag investment as valid or invalid
 * @access private
 */
router.put('/:investmentId/validity', checkAuth, checkAdmin, toggleInvestmentValidity);
module.exports = router;
