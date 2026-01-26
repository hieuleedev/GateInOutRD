import { create } from 'zustand';
import { createAccessRequestApi, getAccessRequestsByApproverApi,  approveAccessRequestApi,
  rejectAccessRequestApi } from '../services/accessRequest.service';
import type { AccessRequestPayload } from '../services/accessRequest.service';

interface AccessRequestStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}
interface AccessRequestState {
  loading: boolean;
  error: string | null;
  success: boolean;
  accessRequests: any[],
  stats: AccessRequestStats | null;
  createAccessRequest: (payload: AccessRequestPayload) => Promise<void>;
  getAccessRequestsByApprover: () => Promise<void>;
  approveAccessRequest: (requestId: number) => Promise<void>;
  rejectAccessRequest: (requestId: number) => Promise<void>;
  reset: () => void;
}

export const useAccessRequestStore = create<AccessRequestState>((set) => ({
  loading: false,
  error: null,
  success: false,
  accessRequests: [],
  stats: null,

  createAccessRequest: async (payload) => {
    try {
      set({ loading: true, error: null, success: false });

      await createAccessRequestApi(payload);

      set({ loading: false, success: true });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Đăng ký thất bại'
      });
    }
  },
  getAccessRequestsByApprover: async () => {
    try {
      set({ loading: true, error: null, success: false });
      
      const res:any = await getAccessRequestsByApproverApi();
      console.log("res",res)
      set({accessRequests: res.data, stats: res.stats})
      set({ loading: false, success: true });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Đăng ký thất bại'
      });
    }
  },

  approveAccessRequest: async (requestId) => {
    try {
      set({ loading: true, error: null, success: false });
  
      await approveAccessRequestApi(requestId);
  
      // refresh list sau khi duyệt
      //await get().getAccessRequestsByApprover();
  
      set({ loading: false, success: true });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Duyệt thất bại'
      });
    }
  },
  
  rejectAccessRequest: async (requestId) => {
    try {
      set({ loading: true, error: null, success: false });
  
      await rejectAccessRequestApi(requestId);
  
      // refresh list sau khi từ chối
      //await get().getAccessRequestsByApprover();
  
      set({ loading: false, success: true });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Từ chối thất bại'
      });
    }
  },
  

  reset: () => set({
    loading: false,
    error: null,
    success: false
  })
}));
