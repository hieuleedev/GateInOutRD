import React, { useState } from 'react';
import { Clock, MapPin, Briefcase, Building, CheckCircle, XCircle, Plus } from 'lucide-react';

const StatsCards = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const requests = [
    {
      id: 1,
      name: 'Ngô Thị Lan',
      employeeId: 'NV123456',
      department: 'Phòng Thiết kế quy trình',
      position: 'Chuyên viên thông tin nâng vấc về Tài',
      location: 'NM Tài',
      checkIn: '09:00 23/01/2026',
      checkOut: '18:00 23/01/2026',
      status: 'pending',
      createdAt: '16:28 22/01/2026'
    },
    {
      id: 2,
      name: 'Hoàng Minh Đức',
      employeeId: 'NV180145',
      department: 'Phòng Thư nghiệm',
      position: 'Chuyên viên Thử nghiệm linh kiện',
      location: 'NM ANMC',
      checkIn: '10:00 21/01/2026',
      checkOut: '15:00 21/01/2026',
      status: 'pending',
      createdAt: '22:28 19/01/2026',
      updatedAt: '22:28 20/01/2026',
      approver: 'Nguyễn Thiên Bảo - 1254201'
    },
    {
      id: 3,
      name: 'Trần Văn Nam',
      employeeId: 'NV156789',
      department: 'Phòng Kỹ thuật',
      position: 'Kỹ sư phần mềm',
      location: 'NM Tài',
      checkIn: '08:00 22/01/2026',
      checkOut: '17:00 22/01/2026',
      status: 'pending',
      createdAt: '10:15 21/01/2026'
    }
  ];

  const stats = {
    pending: 3,
    approved: 3,
    rejected: 2
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);
  return (
                <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {request.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.employeeId} • {request.position}</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Chờ duyệt
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>Phòng ban: {request.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Đơn vị tác nghiệp: {request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-gray-900">Ra: {request.checkOut}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900">Vào: {request.checkIn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-gray-900">Mục đích: {request.checkOut}</span>
                  </div>
                </div>

                {request.approver && (
                  <div className="mb-3 text-sm text-blue-600 font-medium">
                    Nhân sự đi cùng: {request.approver}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    Ngày tạo: {request.createdAt}
                    {request.updatedAt && <span className="ml-2">• Cập nhật: {request.updatedAt}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>  
  );


}
export default StatsCards;
