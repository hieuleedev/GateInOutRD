import api from '../lib/api';
  
  // Lấy tất cả nhà máy
  export const saveFcmToken = (fcm_token:any,) => {
    return api.post<any>('/users/save-fcm-token',
       { fcm_token },
    );
  };
  