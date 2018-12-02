const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/recent').get(tourneyController.find_all_recent);
router.route('/create').post(tourneyController.create);
router.route('/join/:owner/:id').post(tourneyController.find_one);
router.route('/join_tournament').post(tourneyController.join_tourney);
router.route('/search/:search').post(tourneyController.find_search);
router.route('/getusers').post(tourneyController.get_all_users_tourney);
router.route('/setmatches').post(tourneyController.send_users_to_matches);
router.route('/matches/:id').post(tourneyController.get_players);
router.route('/nextmatch').post(tourneyController.create_next_match);
router.route('/update_match').post(tourneyController.update_match);

module.exports = router;