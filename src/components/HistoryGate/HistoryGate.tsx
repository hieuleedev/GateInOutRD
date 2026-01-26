import React from "react";

interface HistoryItem {
  id: number;
  name: string;
  msnv: string;
  department: string;
  regOut: string;
  regIn: string;
  realOut: string;
  realIn: string;
}

const data: HistoryItem[] = [
  {
    id: 1,
    name: "Ngô Thị Lan",
    msnv: "1501235",
    department: "Thiết kế quy trình",
    regOut: "07:50 - 23/01/2026",
    regIn: "09:00 - 23/01/2026",
    realOut: "07:50 - 23/01/2026",
    realIn: "08:50 - 23/01/2026",
  },
  {
    id: 2,
    name: "Nguyễn Trung Trực",
    msnv: "1450235",
    department: "Thiết kế Thân Vỏ",
    regOut: "09:00 - 23/01/2026",
    regIn: "09:00 - 23/01/2026",
    realOut: "09:00 - 23/01/2026",
    realIn: "09:00 - 23/01/2026",
  },
  {
    id: 3,
    name: "Trần Văn Nhì",
    msnv: "1420562",
    department: "Thiết kế Điện - Điều hòa",
    regOut: "09:00 - 23/01/2026",
    regIn: "09:00 - 23/01/2026",
    realOut: "09:00 - 23/01/2026",
    realIn: "09:00 - 23/01/2026",
  },
];

const HistoryGate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-5">
          <h2 className="text-2xl font-semibold text-center text-white">
            Lịch sử ra vào cổng
          </h2>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 font-medium text-sm">
                CSV
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 font-medium text-sm">
                Excel
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 font-medium text-sm">
                PDF
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 font-medium text-sm">
                In
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, MSNV, phòng ban..."
                className="border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm w-80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-gray-700 text-left p-4 font-semibold text-sm">STT</th>
                  <th className="text-gray-700 text-left p-4 font-semibold text-sm">Họ & Tên</th>
                  <th className="text-gray-700 text-left p-4 font-semibold text-sm">MSNV</th>
                  <th className="text-gray-700 text-left p-4 font-semibold text-sm">Phòng ban</th>
                  <th className="text-gray-700 text-center p-4 font-semibold text-sm">Thời gian đăng ký</th>
                  <th className="text-gray-700 text-center p-4 font-semibold text-sm">Thời gian thực tế</th>
                  <th className="text-gray-700 text-center p-4 font-semibold text-sm">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {item.msnv}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 text-sm">{item.department}</span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-sm text-center">
                        <div className="text-gray-600">
                          <span className="font-medium">Ra:</span> {item.regOut}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Vào:</span> {item.regIn}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-sm text-center">
                        <div className="text-gray-600">
                          <span className="font-medium">Ra:</span> {item.realOut}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Vào:</span> {item.realIn}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200 font-medium text-sm">
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-2">
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold">1</span> tới <span className="font-semibold">3</span> của <span className="font-semibold">3</span> dữ liệu
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium text-sm">
                Trước
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm font-medium text-sm">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium text-sm">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryGate;