import api from '../lib/api';

export interface Factory {
    id: number;
    factory_code: string;
    factory_name: string;
    address: string;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FactoryListResponse {
    success: boolean;
    data: Factory[];
  }
  
  // Lấy tất cả nhà máy
  export const getAllFactory = () => {
    return api.get<FactoryListResponse>('/factories');
  };