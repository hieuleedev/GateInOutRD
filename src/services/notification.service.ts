import api from '../lib/api';
  
  // Lấy tất cả nhà máy
  export const getNotification = () => {
    return api.get<any>('/notifications');
  };
  