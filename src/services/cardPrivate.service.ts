import api from '../lib/api';

  export const getCardPrivate = (card: string) => {
    return api.get<any>('/card-private', {
      params: { card },
    });
  };
  