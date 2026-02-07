import api from '../lib/api';
export const getAccessLogApi = () => {
    return api.get<any>(
      'access-logs',
    );
  };