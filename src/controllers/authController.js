const authService = require('../services/authService');

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

module.exports = { login };
