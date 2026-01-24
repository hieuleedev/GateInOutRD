import api from '../lib/api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {

  token: string;
  user: any;

}

export const loginApi = (data: LoginPayload) => {
  return api.post<LoginResponse>('auth/login', data);
};
