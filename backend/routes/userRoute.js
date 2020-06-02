const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const {
  manageUserPassword,
  toggleAdmin,
  getAllUsers,
  getCurrentUserInvestments,
  deleteUsersById
} = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');

/** *
 * @route GET /api/users
 * @desc Get All Users <Admin>
 * @access private
 */
// CheckAdmin
router.get('/', checkAuth, checkAdmin, getAllUsers);

/** *
 * @route PUT /api/users/:userId/admin
 * @desc Toggle Admin
 * @access private
 */

router.put('/:userId/admin', checkAuth, toggleAdmin);

/** *
 * @route PUT /api/users/password
 * @desc Update Users password
 * @access private
 */

router.put(
  '/password',
  [check('email', 'Email field is required').isEmail(), check('password', 'Password field is required').notEmpty()],
  manageUserPassword
);

/** *
 * @route GET /api/users/investments
 * @desc Get All investments that belong to a user
 * @access private
 */
router.get('/investments', checkAuth, getCurrentUserInvestments);
/** *
 * @route DELETE /api/users/:userId
 * @desc DELETE user by Id
 * @access private
 */
router.delete('/:userId', checkAuth, checkAdmin, deleteUsersById);

module.exports = router;
