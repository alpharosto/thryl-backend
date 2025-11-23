const router = require('express').Router();
const tournamentController = require('../controllers/tournamentController');

router.get('/', tournamentController.listTournaments);

module.exports = router;
