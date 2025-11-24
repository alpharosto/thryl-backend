const router = require('express').Router();
const tournamentController = require('../controllers/tournamentController');
const requireAuth = require('../middleware/requireAuth');
router.get('/',requireAuth, tournamentController.listTournaments);

module.exports = router;
