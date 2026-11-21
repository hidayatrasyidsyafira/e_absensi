// ============================================
// AUTH LOGIC
// ============================================
const Auth = {
  saveSession(token, user) {
    localStorage.setItem(APP_CONFIG.TOKEN_KEY, token);
    localStorage.setItem(APP_CONFIG.USER_KEY, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(APP_CONFIG.TOKEN_KEY);
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(APP_CONFIG.USER_KEY) || 'null');
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  clearSession() {
    localStorage.removeItem(APP_CONFIG.TOKEN_KEY);
    localStorage.removeItem(APP_CONFIG.USER_KEY);
  },

  async login(nisn, password) {
    const res = await API.post('login', { nis_nip: nisn, password });
    if (res.success) {
      this.saveSession(res.data.token, res.data.user);
    }
    return res;
  },

  async validateToken() {
    const token = this.getToken();
    if (!token) return false;
    const res = await API.post('verify', { token });
    if (!res.success) {
      this.clearSession();
      return false;
    }
    return true;
  },

    logout() {
    this.clearSession();
    // Jika di dalam iframe, arahkan jendela utama (top) ke index.html
    if (window.top !== window.self) {
      window.top.location.href = 'index.html';
    } else {
      window.location.href = 'index.html';
    }
  }
};
