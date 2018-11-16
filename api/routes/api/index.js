const router = require('express').Router();
const userRoutes = require('./users');
const tourneyRoutes = require('./tourneys');

router.use('/users', userRoutes);
router.use('/tournament', tourneyRoutes);

module.exports = router;