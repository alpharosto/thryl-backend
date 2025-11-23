const router = require('express').Router();
const authRoutes = require('./auth');
const tournamentRoutes = require('./tournaments');

router.use('/auth', authRoutes);
router.use('/tournaments', tournamentRoutes);

module.exports = router;
