const authService = require('../services/authService');
const AuthStore = require('../store/authStore');


async function login(req, res, next) {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "phoneNumber required" });
    }

    const result = await authService.thrylLogin(phoneNumber);

    console.log(`[LOGIN ATTEMPT] phone=${phoneNumber} time=${new Date().toISOString()} status=success`);

    return res.json(result);

  } catch (err) {
    console.log(`[LOGIN ATTEMPT] phone=${req.body?.phoneNumber || 'unknown'} time=${new Date().toISOString()} status=failed`);
    next(err);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ success: false, message: "phoneNumber and otp required" });
    }

    const data = await authService.thrylVerifyOtp(phoneNumber, otp);

    // Normalize variations of Thryl API response
    const token =
      data.token ||
      (data.data && data.data.token) ||
      null;

    const userId =
      data.userId ||
      (data.data && data.data.userId) ||
      null;

    // Save in memory
    AuthStore.set({ token, userId });

    console.log(`[VERIFY OTP] phone=${phoneNumber} time=${new Date().toISOString()} tokenStored=${!!token}`);

    return res.json({
      success: true,
      token,
      userId
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, verifyOtp };



