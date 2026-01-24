const TOKEN_KEY = 'token';

const tokenService = {
  /* =====================
   * Get token
   * ===================== */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /* =====================
   * Set token
   * ===================== */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /* =====================
   * Remove token
   * ===================== */
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  /* =====================
   * Check login
   * ===================== */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default tokenService;
