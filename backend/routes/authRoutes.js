const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const { signup, login, getUserByToken } = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuth');
/** *
 * @route POST /api/auth/signup
 * @desc User signup
 * @access public
 */
router.post(
  '/signup',
  [
    check('name', 'Name field is required').notEmpty(),
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').notEmpty()
  ],
  signup
);

/** *
 * @route POST /api/auth/login
 * @desc User login
 * @access public
 */
router.post(
  '/login',
  [check('email', 'Email field is required').isEmail(), check('password', 'Password field is required').notEmpty()],
  login
);

/** *
 * @route GET /api/auth/
 * @desc Get user details with token
 * @access private
 */
router.get('/', checkAuth, getUserByToken);

module.exports = router;
