import { useState,useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAccessRequestStore } from '../../../store/accessRequest.store';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

type Props = {
  requestId: number;
};

const ApproveRejectActions: React.FC<Props> = ({ requestId }) => {
  const {
    approveAccessRequest,
    rejectAccessRequest,
    loading,
    success,
    reset
  } = useAccessRequestStore();

  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  /* ===== HANDLERS ===== */
  const handleApprove = async () => {
    await approveAccessRequest(requestId);
    setShowApprove(false);
  };



  const handleReject = async () => {
    if (!rejectReason.trim()) return;
    await rejectAccessRequest(requestId);
    setRejectReason('');
    setShowReject(false);
  };

  return (
    <>
      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowApprove(true)}
          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600"
        >
          <CheckCircle className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowReject(true)}
          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* ===== APPROVE MODAL ===== */}
      {showApprove && (
        <Modal>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold">
              Xác nhận phê duyệt
            </h3>

            <p className="text-sm text-gray-600">
              Bạn có chắc chắn muốn phê duyệt yêu cầu này không?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowApprove(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Không
              </button>

              <button
                onClick={handleApprove}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Có
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===== REJECT MODAL ===== */}
      {showReject && (
        <Modal>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center">
              Lý do từ chối
            </h3>

            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
              className="w-full border rounded-lg p-2"
              rows={4}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReject(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>

              <button
                onClick={handleReject}
                disabled={!rejectReason.trim() || loading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Gửi từ chối
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ApproveRejectActions;
