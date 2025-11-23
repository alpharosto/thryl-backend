const AuthStore = {
  token: "",
  userId: "",

  set({ token, userId }) {
    if (token) this.token = token;
    if (userId) this.userId = userId;
  },

  clear() {
    this.token = "";
    this.userId = "";
  }
};

module.exports = AuthStore;
