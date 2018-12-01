const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/create').post(tourneyController.create);
router.route('/recent').get(tourneyController.find_all_recent);
router.route('/join/:owner/:id').post(tourneyController.find_one);
router.route('/join_tournament').post(tourneyController.join_tourney);
router.route('/search/:search').post(tourneyController.find_search);
// router.route('/getusers').post(tourneyController.get_all_users_tourney);
module.exports = router;