import React, { useEffect } from "react";
import { useAccessRequestStore } from "../../store/accessRequest.store";

const HistoryGate: React.FC = () => {
  const {
    getAllAccessHistory,
    historyGate,
    loading
  } = useAccessRequestStore();

  useEffect(() => {
    getAllAccessHistory();
  }, []);

  const formatDateTime = (value?: string | null) => {
    if (!value) return '--';
  
    const d = new Date(value);
    if (isNaN(d.getTime())) return '--';
  
    const time = d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  
    const date = d.toLocaleDateString('vi-VN');
  
    return `${time} - ${date}`;
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-5">
          <h2 className="text-2xl font-semibold text-center text-white">
            Lịch sử ra vào cổng
          </h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 text-left">STT</th>
                  <th className="p-4 text-left">Họ & Tên</th>
                  <th className="p-4 text-left">MSNV</th>
                  <th className="p-4 text-left">Phòng Ban</th>
                  <th className="p-4 text-center">Thời gian đăng ký</th>
                  <th className="p-4 text-center">Thời gian thực tế</th>
                  <th className="p-4 text-center">Trạng thái</th>
                </tr>
              </thead>

              <tbody>
                {!loading && historyGate?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      Chưa có lịch sử ra/vào
                    </td>
                  </tr>
                )}

                {historyGate?.map((item: any, index: number) => {
                  const outLog = item.logs?.find((l: any) => l.action === "OUT");
                  const inLog = item.logs?.find((l: any) => l.action === "IN");

                  return (
                    <tr
                      key={item.request_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">{index + 1}</td>

                      <td className="p-4">
                        {item.user?.FullName || '--'}
                      </td>

                      <td className="p-4">
                        {item.user?.MSNV || '--'}
                      </td>

                      <td className="p-4">
                        {item.user?.department?.NameDept || '--'}
                      </td>

                      {/* Thời gian đăng ký */}
                      <td className="p-4 text-center text-sm">
                        <div>
                          <b>Ra:</b> {formatDateTime(item.planned_out_time)}
                        </div>
                        <div>
                          <b>Vào:</b> {formatDateTime(item.planned_in_time)}
                        </div>
                      </td>

                      {/* Thời gian thực tế */}
                      <td className="p-4 text-center text-sm">
                        <div>
                          <b>Ra:</b> {formatDateTime(outLog?.access_time)}
                        </div>
                        <div>
                          <b>Vào:</b> {formatDateTime(inLog?.access_time)}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryGate;
