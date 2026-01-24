import React from 'react';
import { Building2, Shield, User, CreditCard, Briefcase, Users, Clock } from 'lucide-react';

const VerificationCard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {/* Header với thanh xanh */}
      <div className="h-2 bg-blue-700 w-full absolute top-0 left-0"></div>
      
      <div className="max-w-md mx-auto pt-8">
        {/* Icon check thành công */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-teal-600 text-center mb-8">
          XÁC THỰC THÀNH CÔNG
        </h1>

        {/* Card chính */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-500 overflow-hidden">
          {/* Icon và tên trung tâm */}
          <div className="pt-6 pb-4 px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-3">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              TRUNG TÂM R&D Ô TÔ
            </h2>
          </div>

          {/* Badge thường xuyên */}
          <div className="mx-6 mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <div className="text-left">
                  <div className="text-xs text-teal-100 uppercase">Nhóm ra vào cổng</div>
                  <div className="text-white font-bold">THƯỜNG XUYÊN</div>
                </div>
              </div>
              <div className="bg-teal-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ACTIVE
              </div>
            </div>
          </div>

          {/* Thông tin nhân sự */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Tên nhân sự */}
              <div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <User className="w-3 h-3" />
                  <span>TÊN NHÂN SỰ</span>
                </div>
                <div className="font-bold text-gray-900">Lê Trung Hiếu</div>
              </div>

              {/* MSNV */}
              <div>
                <div className="flex items-center gap-1 text-xs text-purple-600 mb-1">
                  <CreditCard className="w-3 h-3" />
                  <span>MSNV</span>
                </div>
                <div className="font-bold text-gray-900">1506437</div>
              </div>

              {/* Chức vụ */}
              <div>
                <div className="flex items-center gap-1 text-xs text-orange-500 mb-1">
                  <Briefcase className="w-3 h-3" />
                  <span>CHỨC VỤ</span>
                </div>
                <div className="font-bold text-gray-900">Chuyên viên</div>
              </div>

              {/* Phòng ban */}
              <div>
                <div className="flex items-center gap-1 text-xs text-purple-600 mb-1">
                  <Users className="w-3 h-3" />
                  <span>PHÒNG BAN</span>
                </div>
                <div className="font-bold text-gray-900">Quản trị dữ liệu</div>
              </div>
            </div>

            {/* Thông tin bổ sung */}
            <div className="bg-blue-600 rounded-lg p-4 text-white space-y-1">
              <div className="text-sm">Đơn vị tác nghiệp: Bus Thaco</div>
              <div className="text-sm">Thời gian: 09:30 – 13:30</div>
              <div className="text-sm">Nhân sự đi cùng: Hoàng Ngọc Thành</div>
            </div>
          </div>

          {/* Footer với thời gian */}
          <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Thời gian xác thực</span>
            </div>
            <span className="font-semibold">23:06:29</span>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Hệ thống bảo mật công ty đóng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;