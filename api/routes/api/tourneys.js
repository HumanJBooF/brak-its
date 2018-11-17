const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/create').post(tourneyController.create);
router.route('/recent').get(tourneyController.find_all_recent);
module.exports = router;