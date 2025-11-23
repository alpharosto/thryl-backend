const { fetchTournaments } = require('../services/tournamentService');
const AuthStore = require('../store/authStore');

async function listTournaments(req, res, next) {
  try {
    const token = AuthStore.token;

    const result = await fetchTournaments(token);

    let tournaments = result.items || result.tournaments || result || [];

    // Ensure we always work with an array
    if (!Array.isArray(tournaments)) tournaments = [];

    // --- NEW: Filtering logic ---
    const segment = (req.query.segment || "all").toLowerCase();

    if (segment === "ongoing") {
      tournaments = tournaments.filter(t => {
        const status = (t.status || "").toLowerCase();
        return status === "ongoing";
      });
    }

    // Return raw filtered list (pagination next commit)
    return res.json({
      segment,
      total: tournaments.length,
      items: tournaments
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { listTournaments };
