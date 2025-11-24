const { fetchTournaments } = require('../services/tournamentService');
const AuthStore = require('../store/authStore');


function mapTournament(raw) {
  if (!raw) return {};

  return {
    id: raw.id || raw._id || null,
    name: raw.name || raw.title || "",
    status: raw.status || "unknown",
    prizepool: raw.prizepool || raw.prize || 0,
    participants: raw.participants || raw.registeredCount || 0,
    maxparticipants: raw.maxparticipants || raw.maxParticipants || raw.max || 0,
    startDate: raw.startDate || raw.startsAt || null,
    endDate: raw.endDate || raw.endsAt || null
  };
}

async function listTournaments(req, res, next) {
  try {
    const token = AuthStore.token;

    // Fetch tournaments from Thryl API or mock
    const result = await fetchTournaments(token);
    let tournaments = result.items || result.tournaments || result || [];

    if (!Array.isArray(tournaments)) tournaments = [];

  
    const segment = (req.query.segment || "all").toLowerCase();

    if (segment !== "all") {
      tournaments = tournaments.filter(t => {
        const status = (t.status || "").toLowerCase();
        return status === segment; // exact match: ongoing, upcoming, finished
      });
    }

   
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const total = tournaments.length;
    const start = (page - 1) * limit;
    const paginated = tournaments.slice(start, start + limit);

    const mappedItems = paginated.map(mapTournament);
    logger.info({ segment, page, limit }, "Fetching tournaments");

    return res.json({
      segment,
      page,
      limit,
      total,
      items: mappedItems
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { listTournaments };
