// ============================================
// API WRAPPER
// ============================================
const API = {
  async get(action, params = {}) {
    const query = new URLSearchParams({ action, ...params }).toString();
    const url = `${APP_CONFIG.API_URL}?${query}`;
    try {
      const res = await fetch(url, { method: 'GET' });
      return await res.json();
    } catch (err) {
      console.error('API GET error:', err);
      return { success: false, message: 'Koneksi gagal. Cek internet kamu.' };
    }
  },

  async post(action, data = {}) {
    const payload = { action, ...data };
    try {
      const res = await fetch(APP_CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.error('API POST error:', err);
      return { success: false, message: 'Koneksi gagal. Cek internet kamu.' };
    }
  }
};
