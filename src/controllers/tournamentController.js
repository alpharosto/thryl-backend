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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const total = tournaments.length;

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = tournaments.slice(start, end);

    // Return raw filtered list (pagination next commit)
    return res.json({
      segment,

      page,
      limit,
      total,
      items: paginatedItems
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { listTournaments };
