const authService = require('../services/authService');
const AuthStore = require('../store/authStore');
const logger = require('../utils/logger');


async function login(req, res, next) {
  try {
    const { phoneNumber } = req.body;
    logger.info({ phoneNumber }, "Login attempt");

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
    // logger.info({ phoneNumber, tokenStored: !!token }, "OTP verified");

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
    const expiresIn = data.expiresIn || (60 * 60); // default 1 hour if not provided
    AuthStore.set({ token, userId, expiresIn });
     logger.info({ phoneNumber, tokenStored: !!token, userId }, "OTP verified");
    console.log(`[VERIFY OTP] phone=${phoneNumber} time=${new Date().toISOString()} tokenStored=${!!token}`);

    return res.json({
      success: true,
      token,
      userId,
      expiresIn
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, verifyOtp };



