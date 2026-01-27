import { create } from 'zustand';
import { createAccessRequestApi, getAccessRequestsByApproverApi,  approveAccessRequestApi,getAllAccessHistoryApi,
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
  regisError: string | null;
  success: boolean;
  accessRequests: any[],
  regisSucces: boolean;
  historyGate?: any[],
  stats: AccessRequestStats | null;
  createAccessRequest: (payload: AccessRequestPayload) => Promise<any>;
  getAccessRequestsByApprover: () => Promise<void>;
  approveAccessRequest: (requestId: number) => Promise<void>;
  rejectAccessRequest: (requestId: number, reason: string) => Promise<void>;
  getAllAccessHistory:()=>Promise<void>;
  reset: () => void;
}

export const useAccessRequestStore = create<AccessRequestState>((set) => ({
  loading: false,
  error: null,
  success: false,
  accessRequests: [],
  stats: null,
  regisSucces:false,
  regisError: null,

  createAccessRequest: async (payload) => {
    try {
      set({ loading: true, regisError: null, success: false });
  
      const res = await createAccessRequestApi(payload);
  
      set({ loading: false, regisSucces: true });
  
      return res; // 👈 TRẢ VỀ ĐÂY
    } catch (err: any) {
      set({
        loading: false,
        regisError: err?.response?.data?.message || 'Đăng ký thất bại'
      });
  
      throw err; // 👈 ném lỗi để bên ngoài bắt
    }
  },
  
  getAccessRequestsByApprover: async () => {
    try {
      set({ loading: true, error: null });
        
      const res:any = await getAccessRequestsByApproverApi();
      set({ accessRequests: res.data, stats: res.stats });
  
      set({ loading: false }); // ❌ bỏ success
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Load thất bại'
      });
    }
  },
  

  approveAccessRequest: async (requestId) => {
    try {
      set({ loading: true, error: null, success: false });
  
      await approveAccessRequestApi(requestId);
      const res:any = await getAccessRequestsByApproverApi();
      set({ accessRequests: res.data, stats: res.stats });
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
  
  rejectAccessRequest: async (requestId,reason) => {
    try {
      set({ loading: true, error: null, success: false });
  
      await rejectAccessRequestApi(requestId,reason);
      const res:any = await getAccessRequestsByApproverApi();
      set({ accessRequests: res.data, stats: res.stats });
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

  getAllAccessHistory: async () => {
    try {
      set({ loading: true, error: null, success: false });
      const res:any = await getAllAccessHistoryApi();
      //await rejectAccessRequestApi(requestId,reason);
      //const res:any = await getAccessRequestsByApproverApi();
     // set({ accessRequests: res.data, stats: res.stats });
      // refresh list sau khi từ chối
      //await get().getAccessRequestsByApprover();
      console.log("res",res)
      set({ loading: false, success: true, historyGate: res.data });
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
