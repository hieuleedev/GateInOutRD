import React, { useEffect, useCallback, useRef } from "react";
import { useAccessRequestStore } from "../../store/accessRequest.store";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const HistoryGate: React.FC = () => {
  const { getAllAccessHistory, historyGate, loading } = useAccessRequestStore();

  const lastExportDate = useRef<string | null>(null);

  // ================= FORMAT DATE =================
  const formatDateTime = (value?: string | null) => {
    if (!value) return "--";

    const d = new Date(value);
    if (isNaN(d.getTime())) return "--";

    const time = d.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const date = d.toLocaleDateString("vi-VN");

    return `${time} - ${date}`;
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    getAllAccessHistory();
  }, [getAllAccessHistory]);

  // ================= EXPORT FUNCTION =================
  const exportToExcel = useCallback(() => {
    if (!historyGate || historyGate.length === 0) return;
  
    const rows: any[] = [];
  
    historyGate.forEach((item: any, index: number) => {
      const sortedLogs = [...(item.logs || [])].sort(
        (a, b) =>
          new Date(a.access_time).getTime() -
          new Date(b.access_time).getTime()
      );
  
      const companions =
        item.companions?.length > 0
          ? item.companions
              .map((c: any) => `${c.user?.FullName} (${c.user?.MSNV})`)
              .join(", ")
          : "--";
  
      const baseInfo = {
        STT: index + 1,
        "Họ & Tên": item.user?.FullName || "--",
        MSNV: item.user?.MSNV || "--",
        "Phòng Ban": item.user?.department?.NameDept || "--",
        "Người đi cùng": companions,
        "Đăng ký Ra": formatDateTime(item.planned_out_time),
        "Đăng ký Vào": formatDateTime(item.planned_in_time),
        "Trạng thái": item.status,
      };
  
      if (sortedLogs.length === 0) {
        rows.push({
          ...baseInfo,
          "Hành động": "--",
          "Thời gian thực tế": "--",
          Gate: "--",
          Location: "--",
        });
      } else {
        sortedLogs.forEach((log: any) => {
          rows.push({
            ...baseInfo,
            "Hành động": log.action === "OUT" ? "RA" : "VÀO",
            "Thời gian thực tế": formatDateTime(log.access_time),
            Gate: log.gate || "--",
            "Đơn vị": log.location || "--",
          });
        });
      }
    });
  
    if (rows.length === 0) return;
  
    const worksheet = XLSX.utils.json_to_sheet(rows);
  
    // Auto width columns theo nội dung
    const colWidths = Object.keys(rows[0]).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...rows.map((row) =>
          row[key] ? row[key].toString().length : 0
        )
      );
      return { wch: maxLength + 5 };
    });
  
    worksheet["!cols"] = colWidths;
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LichSuRaVao");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
  
    const today = new Date().toISOString().split("T")[0];
  
    saveAs(blob, `Lich_su_ra_vao_${today}.xlsx`);
    lastExportDate.current = today;
  }, [historyGate]);
  console.log("history,",historyGate)
  // ================= AUTO EXPORT 16:15 =================
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      if (
        now.getHours() === 16 &&
        now.getMinutes() === 15 &&
        lastExportDate.current !== today
      ) {
        exportToExcel();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [exportToExcel]);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            Lịch sử ra vào cổng
          </h2>

          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
            Tải file lịch sử ra vào cổng
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left">STT</th>
                <th className="p-4 text-left">Họ & Tên</th>
                <th className="p-4 text-left">MSNV</th>
                <th className="p-4 text-left">Phòng Ban</th>
                <th className="p-4 text-left">Người đi cùng</th>
                <th className="p-4 text-center">Đăng ký</th>
                <th className="p-4 text-center">Lịch sử thực tế</th>
                {/* <th className="p-4 text-center">Trạng thái</th> */}
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
                const sortedLogs = [...(item.logs || [])].sort(
                  (a, b) =>
                    new Date(a.access_time).getTime() -
                    new Date(b.access_time).getTime()
                );

                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 align-top">
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4">{item.user?.FullName || "--"}</td>

                    <td className="p-4">{item.user?.MSNV || "--"}</td>

                    <td className="p-4">
                      {item.user?.department?.NameDept || "--"}
                    </td>

                    <td className="p-2 text-xs">
                      {item.companions?.length > 0 ? (
                        <div className="space-y-1">
                          {item.companions.map((c: any) => (
                            <div key={c.id} className="leading-tight">
                              <span className="font-medium">{c.user?.FullName}</span>
                              <span className="text-gray-500">
                                {" "}
                                ({c.user?.MSNV})
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        "--"
                      )}
                    </td>

                    <td className="p-4 text-sm">
                      <div>
                        <b>Ra:</b> {formatDateTime(item.planned_out_time)}
                      </div>
                      <div>
                        <b>Vào:</b> {formatDateTime(item.planned_in_time)}
                      </div>
                    </td>

                    <td className="p-3 text-sm">
                      {sortedLogs.length === 0 && <div>--</div>}

                      <div className="space-y-1">
                        {sortedLogs.map((log: any) => (
                          <div
                            key={log.id}
                            className="flex items-center gap-2 text-xs leading-tight">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                log.action === "OUT"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            />

                            <span className="font-medium">
                              {log.action === "OUT" ? "RA" : "VÀO"}
                            </span>

                            <span>{formatDateTime(log.access_time)}</span>

                            <span className="text-gray-500 truncate max-w-[180px]">
                              {log.location}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                        {item.status}
                      </span>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loading && (
            <div className="p-6 text-center text-gray-500">
              Đang tải dữ liệu...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryGate;
