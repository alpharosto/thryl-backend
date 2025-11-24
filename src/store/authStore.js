// src/store/authStore.js
const AuthStore = {
  token: "",
  userId: "",
  createdAt: null, // epoch ms
  expiresIn: 0,    // seconds - mock expiry

  set({ token, userId, expiresIn }) {
    if (token) this.token = token;
    if (userId) this.userId = userId;
    this.createdAt = Date.now();
    if (expiresIn !== undefined) this.expiresIn = Number(expiresIn) || 0;
  },

  clear() {
    this.token = "";
    this.userId = "";
    this.createdAt = null;
    this.expiresIn = 0;
  },

  isPresent() {
    return !!this.token;
  },

  isExpired() {
    if (!this.createdAt || !this.expiresIn) return false; // treat as non-expiring if not set
    const ageSeconds = (Date.now() - this.createdAt) / 1000;
    return ageSeconds > this.expiresIn;
  },

  get() {
    return {
      token: this.token,
      userId: this.userId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn
    };
  }
};

module.exports = AuthStore;
