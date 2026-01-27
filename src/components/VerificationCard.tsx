import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Building2, Shield, User, Clock } from "lucide-react";
import { getCard } from "../services/card.service";

const API_URL = import.meta.env.VITE_API_URL;

const formatTime = (time: string) =>
  new Date(time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const VerificationCard = () => {
  const { code } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    const fetchCard = async () => {
      try {
        const res = await getCard(code);
        setData(res);
      } catch (err) {
        console.error("Lỗi truy vấn thẻ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [code]);

  if (loading) {
    return <div className="text-center mt-20">Đang xác thực...</div>;
  }

  if (!data?.allowed) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Không có quyền ra vào
      </div>
    );
  }

  const request = data.access_request;
  const user = request.user;
  const companions = request.companions || [];

  const workTime = `${formatTime(request.planned_out_time)} – ${formatTime(
    request.planned_in_time
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="relative max-w-sm w-full">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden">
          {/* CARD */}
          <div className="mx-4 my-4 border-2 border-gray-300 rounded-xl p-4 bg-gray-50">
            {/* HEADER */}
            <div className="flex flex-col items-center mb-3">
              <div className="bg-blue-500 rounded-lg p-3 mb-2">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-sm font-bold text-gray-800">
                TRUNG TÂM R&D Ô TÔ
              </h2>
            </div>

            {/* STATUS */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg py-2 px-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <div className="text-white text-sm font-bold">ĐƯỢC PHÉP</div>
                </div>
                <div className="bg-green-700 text-white text-[10px] px-2 py-1 rounded">
                  ACTIVE
                </div>
              </div>
            </div>

            {/* AVATAR GRID */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {/* MAIN USER */}
              <div className="col-span-2 row-span-2">
                <div className="rounded-lg overflow-hidden border-2 border-blue-500 h-full">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/files/${user.Avatar}`}
                    alt={user.FullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* COMPANIONS */}
              {companions.map((c: any) => (
                <div key={c.id} className="aspect-square">
                  <div className="rounded-lg overflow-hidden border h-full">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/files/${c.user.Avatar}`}
                      alt={c.user.FullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* USER INFO */}
            {/* USER INFO */}
            <div className="space-y-4 mb-4">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                {/* TÊN NHÂN SỰ */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold">
                      TÊN NHÂN SỰ
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    {user.FullName}
                  </div>
                </div>

                {/* MSNV */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        ID
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold">
                      MSNV
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    {user.MSNV}
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                {/* CHỨC VỤ */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-yellow-600 rounded flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold">
                      CHỨC VỤ
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-gray-800">
                    {user.Division}
                  </div>
                </div>

                {/* PHÒNG BAN */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold">
                      PHÒNG BAN
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-gray-800">
                    {user.department?.NameDept}
                  </div>
                </div>
              </div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs space-y-1">
              <div>
                <strong>Đơn vị tác nghiệp:</strong>{" "}
                {request.factory.factory_name}
              </div>
              <div>
                <strong>Thời gian:</strong> {workTime}
              </div>
              <div>
                <strong>Đi cùng:</strong>{" "}
                {companions.map((c: any) => c.user.FullName).join(", ")}
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-2">
            <p className="text-center text-xs text-white font-medium">
              HỆ THỐNG KIỂM SOÁT RA VÀO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
