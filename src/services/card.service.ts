import api from '../lib/api';
  
  // Lấy tất cả nhà máy
  export const getCard = (card: string) => {
    return api.get<any>('/card', {
      params: { card },
    });
  };
  