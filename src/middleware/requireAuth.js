// src/middleware/requireAuth.js
const AuthStore = require('../store/authStore');

function requireAuth(req, res, next) {
  // 1) token present?
  if (!AuthStore.isPresent()) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: verify OTP first'
    });
  }

  // 2) check expiry (simulated)
  if (AuthStore.isExpired()) {
    // clear token (optional)
    AuthStore.clear();
    return res.status(401).json({
      success: false,
      message: 'Session expired. Please login again.'
    });
  }

  // attach small auth info to request for downstream use
  req.auth = {
    token: AuthStore.token,
    userId: AuthStore.userId
  };

  return next();
}

module.exports = requireAuth;
