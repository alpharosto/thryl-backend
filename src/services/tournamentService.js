const axiosClient = require('../utils/axiosClient');

async function fetchTournaments(token) {
  const headers = {};

  // Add token only if present
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Call Thryl tournament API
  const response = await axiosClient.get('/tournaments', { headers });
  return response.data;
}

module.exports = { fetchTournaments };
