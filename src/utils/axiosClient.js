const axios = require('axios');
const { config } = require('../config');

const axiosClient = axios.create({
  baseURL: config.thrylBaseUrl,
  timeout: 10000 
});

//debugging
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Thryl API Error →", error?.message);
    return Promise.reject(error);
  }
);

module.exports = axiosClient;
