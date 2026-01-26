import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginApi } from '../services/auth.service';

interface AuthState {
  user?: any;
  token?: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      login: async (username, password) => {
        try {
          set({ loading: true });

          const res = await loginApi({ username, password });
          console.log("res",res)
          // 👉 LƯU LOCAL STORAGE THỦ CÔNG
          localStorage.setItem('token', res.token);

          set({
            user: res.user,
            token: res.token,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        // 👉 XOÁ CẢ 2
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // persist key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
