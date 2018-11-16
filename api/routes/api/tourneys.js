const router = require('express').Router();
const tourneyController = require('../../controllers/tourneyController');

router.route('/create').post(tourneyController.create);

module.exports = router;