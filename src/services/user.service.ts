import api from '../lib/api';

/* =======================
   USER
======================= */

export interface User {
  id: number;
  MSNV: string;
  FullName: string;
  MailAdress: string;
  Division: string;
  PositionDetail: string;
  Avatar: string;
}

export interface UserListResponse {
  success: boolean;
  data: User[];
}

// Lấy danh sách nhân sự cùng phòng ban
export const getUsersInMyDepartment = () => {
  return api.get<UserListResponse>('/users/my-department');
};
