const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/recent').get(tourneyController.find_all_recent);
router.route('/create').post(tourneyController.create);
router.route('/join/:owner/:id').post(tourneyController.find_one);
router.route('/join_tournament').post(tourneyController.join_tourney);
router.route('/getusers').post(tourneyController.get_all_users_tourney);
router.route('/setmatches').post(tourneyController.send_users_to_matches);
router.route('/matches/:id').post(tourneyController.get_players);

module.exports = router;