const { fetchTournaments } = require('../services/tournamentService');
const AuthStore = require('../store/authStore');

async function listTournaments(req, res, next) {
  try {
    const token = AuthStore.token;

    const result = await fetchTournaments(token);

    // Note: Filtering + Pagination will be added in Commit 9–10
    return res.json(result);

  } catch (err) {
    next(err);
  }
}

module.exports = { listTournaments };
