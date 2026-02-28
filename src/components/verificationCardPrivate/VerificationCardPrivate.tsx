import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Building2, Shield, User, Clock, AlertTriangle } from "lucide-react";
import { getCardPrivate } from "../../services/cardPrivate.service";

const formatDateTime = (time?: string) => {
    if (!time) return "-";
    return new Date(time).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

const VerificationCardPrivate = () => {
  const { code } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    const fetchCard = async () => {
      try {
        const res = await getCardPrivate(code);
        setData(res);
      } catch (err: any) {
        alert(err?.response?.data?.message || "Lỗi xác thực thẻ");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [code]);

  if (loading) {
    return <div className="text-center mt-20">Đang xác thực...</div>;
  }

  if (!data?.access_request) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Không tìm thấy yêu cầu
      </div>
    );
  }

  const request = data.access_request;
  const user = request.user;

  // ✅ CHỈ CHẤP NHẬN 3 LOẠI
  const validTypes = ["DI_TRE", "VE_TRE", "VE_SOM"];
  if (!validTypes.includes(request.request_type)) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Không phải đơn đi trễ / về trễ / về sớm
      </div>
    );
  }

  // 🎯 MAP LOẠI
  const typeMap: any = {
    DI_TRE: {
      label: "ĐI LÀM TRỄ",
      bg: "bg-red-100",
      text: "text-red-600",
    },
    VE_TRE: {
      label: "VỀ TRỄ",
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    VE_SOM: {
      label: "VỀ SỚM",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
  };

  const typeInfo = typeMap[request.request_type];

  // 🎯 THỜI GIAN HIỂN THỊ
  let displayTime = "";
  if (request.request_type === "DI_TRE") {
    displayTime = formatDateTime(request.planned_in_time);
  } else {
    displayTime = formatDateTime(request.planned_out_time);
  }

  // 🎯 STATUS
  const isApproved = request.status === "APPROVED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden">
          <div className="p-4 bg-gray-50 rounded-xl m-4 border-2 border-gray-300">

            {/* HEADER */}
            <div className="flex flex-col items-center mb-3">
              <div className="bg-blue-500 rounded-lg p-3 mb-2">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-sm font-bold text-gray-800">
                TRUNG TÂM R&D Ô TÔ
              </h2>

              {/* LOẠI */}
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${typeInfo.bg} ${typeInfo.text}`}
              >
                {typeInfo.label}
              </div>
            </div>

            {/* STATUS */}
            {isApproved ? (
              <div className="bg-green-500 rounded-lg py-2 px-4 mb-3 text-white text-center font-bold">
                ĐƯỢC PHÉP
              </div>
            ) : (
              <div className="bg-red-500 rounded-lg py-2 px-4 mb-3 text-white text-center font-bold">
                KHÔNG ĐƯỢC PHÉP
              </div>
            )}

            {/* NOTE */}
            {data?.note && (
              <div className="bg-yellow-400 rounded-lg py-2 px-4 mb-3 text-white text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {data.note}
              </div>
            )}

            {/* AVATAR */}
            <div className="mb-4">
              <div className="rounded-lg overflow-hidden border-2 border-blue-500">
                <img
                  src={`${import.meta.env.VITE_API_URL}/files/${user?.Avatar}`}
                  alt={user?.FullName}
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

            {/* USER INFO */}
            <div className="space-y-2 text-sm mb-4">
              <div><strong>Tên:</strong> {user?.FullName}</div>
              <div><strong>MSNV:</strong> {user?.MSNV}</div>
              <div><strong>Chức vụ:</strong> {user?.Division}</div>
              <div><strong>Phòng ban:</strong> {user?.department?.NameDept}</div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs space-y-1">
              <div>
                <strong>Thời gian hợp lệ:</strong> {displayTime}
              </div>
              <div>
                <strong>Lý do:</strong> {request.reason || "-"}
              </div>
            </div>

            {/* VERIFY TIME */}
            <div className="mt-4 flex items-center justify-center gap-2 border rounded-lg py-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <div className="text-sm font-bold">
                {new Date().toLocaleTimeString("vi-VN")}
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="bg-blue-600 py-2">
            <p className="text-center text-xs text-white font-medium">
              HỆ THỐNG KIỂM SOÁT RA VÀO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCardPrivate;