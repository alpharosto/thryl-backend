const axiosClient = require('../utils/axiosClient');

async function thrylLogin(phoneNumber) {
  const response = await axiosClient.post('/auth/login', { phoneNumber });
  return response.data;
}

async function thrylVerifyOtp(phoneNumber, otp) {
  const response = await axiosClient.post('/auth/verify-otp', { phoneNumber, otp });
  return response.data;
}


module.exports = { thrylLogin , thrylVerifyOtp };
