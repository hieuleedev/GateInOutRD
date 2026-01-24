import React, { useState } from 'react';
import { Clock, MapPin, Briefcase, Building, CheckCircle, XCircle, Plus } from 'lucide-react';
import StatsCards from './StatsCards';
import { useNavigate } from 'react-router-dom';
const RequestListComponent = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();
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
  const handleRegisterForm =()=>{
    navigate("/register")
  }

  const filteredRequests = requests.filter(req => req.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Danh Sách Đơn Đăng Ký</h1>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Quản Lý Ra Vào Cổng</h2>
                <p className="text-sm text-gray-500">Trung tâm R&D Ô tô</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition" onClick={handleRegisterForm}>
              <Plus className="w-4 h-4" />
              Tạo đơn mới
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã duyệt</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Từ chối</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'pending'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Chờ duyệt
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'approved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Đã duyệt
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'rejected'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Từ chối
            </button>
          </div>
          <StatsCards/>
        </div>
      </div>
    </div>
  );
};

export default RequestListComponent;