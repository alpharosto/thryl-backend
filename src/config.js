require('dotenv').config();

const config = {
  port: Number(process.env.PORT) || 3000,
  thrylBaseUrl: process.env.THRYL_API_BASE_URL || ''
};

module.exports = { config };
