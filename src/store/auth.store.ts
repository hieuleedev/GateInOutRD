import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginApi } from '../services/auth.service';
import type { AxiosError } from 'axios';

interface AuthState {
  user: any | null;
  token: string | null;
  message: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      message: '',
      loading: false,

      login: async (username, password) => {
        try {
          set({ loading: true, message: '' });

          const res = await loginApi({ username, password });

          // Lưu token
          localStorage.setItem('token', res.token);

          set({
            user: res.user,
            token: res.token,
            loading: false,
          });
        } catch (error: unknown) {
          let errorMessage = 'Đăng nhập thất bại';

          if (error && typeof error === 'object') {
            const axiosError = error as AxiosError<any>;
            errorMessage =
              axiosError.response?.data?.message ||
              axiosError.message ||
              errorMessage;
          }

          set({
            loading: false,
            message: errorMessage,
          });
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          message: '',
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);