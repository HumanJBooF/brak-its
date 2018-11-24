const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/create').post(tourneyController.create);
router.route('/recent').get(tourneyController.find_all_recent);
router.route('/join/:owner/:id').post(tourneyController.find_one);
router.route('/join_tournament').post(tourneyController.join_tourney);
module.exports = router;