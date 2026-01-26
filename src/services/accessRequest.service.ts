import api from '../lib/api';

export interface AccessRequestPayload {
  factory_id: string;
 // card_id: number;
  checkInTime: string;
  checkOutTime: string;
  reason?: string;
  companions?: number[];
}

export interface AccessRequestResponse {
  message: string;
  data: {
    id: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    planned_out_time: string;
    planned_in_time: string;
  };
}

export const createAccessRequestApi = (data: AccessRequestPayload) => {
  return api.post<AccessRequestResponse>(
    'access-requests',
    data
  );

};
export const getAccessRequestsByApproverApi = () => {
  return api.get<any>(
    'access-requests',
  );
};

export const approveAccessRequestApi = (requestId: number) => {
  return api.post(
    `access-requests/${requestId}/approve`
  );
};

/* ===== REJECT ===== */
export const rejectAccessRequestApi = (requestId: number) => {
  return api.post(
    `access-requests/${requestId}/reject`
  );
};
