import React, { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";
import { useAccessRequestStore } from "../../../store/accessRequest.store";
import { useAuthStore } from "../../../store/auth.store";
import ApproveRejectActions from "./ApproveRejectActions";
type Props = {
  activeTab: "all" | "pending" | "approved" | "rejected";
};
type User = {
  id: number;
  FullName: string;
  MSNV: string;
  Division: string;
  department: any;
};

type Factory = {
  id: number;
  factory_code: string;
  factory_name: string;
};

type Card = {
  id: number;
  card_code: string;
};

type Companion = {
  id: number;
  user: User;
};

type Approval = {
  id: number;
  approver_id: number;
  decision: "PENDING" | "APPROVED" | "REJECTED" | null;
  approver: User;
  comment: string;
};

type Request = {
  id: number;
  approval_levels: number;
  current_approval_level: number;
  planned_out_time: string;
  planned_in_time: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: User;
  factory: Factory;
  MSNV: string;
  card: Card;
  companions: Companion[];
  approvals: Approval[];
  material_note: string;
};

type AccessRequestItem = {
  id: number;
  request: Request;
};
const statusText = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const StatsCards: React.FC<Props> = ({ activeTab }) => {
  const { getAccessRequestsByApprover, accessRequests } =
    useAccessRequestStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getAccessRequestsByApprover();
  }, [getAccessRequestsByApprover]);

  const filteredRequests = (accessRequests as AccessRequestItem[]).filter(
    (item) => {
      if (activeTab === "all") return true;
      return item.request.status.toLowerCase() === activeTab;
    }
  );
  

  const getApprovalStatus = (
    approval: Approval,
    index: number,
    currentLevel: number
  ): "approved" | "rejected" | "pending" | "waiting" => {
    if (approval.decision === "APPROVED") return "approved";
    if (approval.decision === "REJECTED") return "rejected";
    if (index === currentLevel) return "pending";
    return "waiting";
  };

  return (
    <div className="space-y-4">
      {filteredRequests.map((item) => {
        const req = item.request;
        console.log("req",req)
        // ⚠️ FIX: sắp xếp approvals để không bị lộn
        const sortedApprovals = [...req.approvals].sort((a, b) => a.id - b.id);
        const currentApproval = sortedApprovals.find(
          (a) => a.decision === "PENDING"
        );
        const isMyTurn =
          currentApproval?.approver_id === user?.id && req.status === "PENDING";

        const totalSteps = sortedApprovals.length;

        const displayStatusText = (() => {
          // Nếu bị từ chối/đã duyệt thì giữ nguyên
          if (req.status === "APPROVED") return "Đã duyệt";
          if (req.status === "REJECTED") return "Từ chối";

          // Nếu đang pending
          if (req.status === "PENDING") {
            // 3 bước: bước 1-2 là xem xét
            if (totalSteps === 3) {
              return "Đang xem xét";
            }
            // các trường hợp còn lại vẫn là chờ duyệt
            return "Chờ duyệt";
          }

          return statusText[req.status];
        })();

        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            {/* ===== HEADER ===== */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {req.user.FullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {req.user.FullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {req.user.MSNV}: {req.user.Division}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColor[req.status]
                }`}>
                {displayStatusText}
              </span>
            </div>

            {/* ===== THÔNG TIN ===== */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>Phòng ban: {req.user.department?.NameDept}</span>
              </div>

              {/* ✅ ẨN nếu không có factory */}
              {req?.factory?.factory_name && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Đơn vị tác nghiệp: {req.factory.factory_name}</span>
                </div>
              )}

              {/* ✅ ẨN nếu không có giờ ra */}
              {req.planned_out_time && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>
                    Ra: {new Date(req.planned_out_time).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}

              {/* ✅ ẨN nếu không có giờ vào */}
              {req.planned_in_time && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>
                    Vào: {new Date(req.planned_in_time).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}

              {/* ✅ ẨN nếu không có mã thẻ */}
              {req?.material_note && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Vật tư mang theo: {req.material_note}</span>
                </div>
              )}

              {req?.card?.card_code && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Số thẻ: {req.card.card_code}</span>
                </div>
              )}
            </div>

            {/* ===== MỤC ĐÍCH ===== */}
            <div className="mb-4 text-sm text-gray-700">
              Mục đích: {req.reason}
            </div>

            {/* ===== QUY TRÌNH DUYỆT ===== */}
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Quy trình duyệt
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {sortedApprovals.map((a, index) => {
                  const status = getApprovalStatus(
                    a,
                    index,
                    req.current_approval_level
                  );

                  const styleMap: Record<string, string> = {
                    approved: "bg-green-500 text-white",
                    rejected: "bg-red-500 text-white",
                    pending: "bg-yellow-400 text-white animate-pulse",
                    waiting: "bg-gray-300 text-gray-600",
                  };

                  return (
                    <div
                      key={a.id}
                      className="flex items-center gap-2 relative">
                      <div className="relative flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${styleMap[status]}`}>
                          {index + 1}
                        </div>

                        {a.comment && (
                          <div
                            className="
                            absolute -top-2 left-full ml-2
                            bg-red-600 text-white text-[10px]
                            px-2 py-0.5 rounded shadow
                            whitespace-nowrap
                            z-50
                          ">
                            {a.comment}
                          </div>
                        )}
                      </div>

                      <span className="text-sm font-medium whitespace-nowrap">
                        {a.approver.FullName}
                      </span>

                      {/* 👉 DẤU GẠCH NỐI */}
                      {index < sortedApprovals.length - 1 && (
                        <div className="w-6 h-[2px] bg-gray-300 mx-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== NGƯỜI ĐI CÙNG ===== */}
            {req.companions.length > 0 && (
              <div className="mb-4 text-sm text-blue-600 font-medium">
                Người đi cùng:{" "}
                {req.companions.map((c) => c.user.FullName).join(", ")}
              </div>
            )}

            {/* ===== FOOTER ===== */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="text-xs text-gray-500">
                Ngày tạo: {new Date(req.createdAt).toLocaleString("vi-VN")}
              </div>

              {/* <div className="flex gap-2">
                <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                  <XCircle className="w-5 h-5" />
                </button>
              </div> */}
              {isMyTurn && <ApproveRejectActions requestId={req.id} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
