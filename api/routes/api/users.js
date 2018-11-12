const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('../../config/passport/passport');

// Matches with "/api/users"
router.route('/create').post(userController.create_user);
router.route('/login').post(passport.authenticate('local'), (req, res) => res.json(req.user));
router.route('/user').get(userController.check_user);
router.route('/logout').post(userController.logout_user);

module.exports = router;
