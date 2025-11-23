const axiosClient = require('../utils/axiosClient');

async function thrylLogin(phoneNumber) {
  const response = await axiosClient.post('/auth/login', { phoneNumber });
  return response.data;
}

module.exports = { thrylLogin };
