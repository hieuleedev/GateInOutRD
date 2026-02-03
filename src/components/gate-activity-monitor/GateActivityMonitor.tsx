import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, MapPin, Clock, User, Building2, AlertCircle, 
  CheckCircle2, Shield, Camera, TrendingUp, Users, Activity,
  FileText, Calendar, AlertTriangle, Bell, Search, Filter
} from 'lucide-react';

// Types
interface Employee {
  name: string;
  id: string;
  department: string;
  position: string;
  gender: 'Nam' | 'Nữ';
  photoUrl?: string;
  phoneNumber: string;
}

interface GateActivity {
  id: number;
  employee: Employee;
  fromArea: string;
  toArea: string;
  fromGate: string;
  toGate: string;
  time: Date;
  guard: string;
  purpose: string;
  status: 'active' | 'completed' | 'warning';
  cardType: 'RFID' | 'QR' | 'Fingerprint';
  temperature?: number;
  notes?: string;
}

interface AreaStatus {
  name: string;
  currentCount: number;
  maxCapacity: number;
  status: 'normal' | 'warning' | 'full';
}

const GateActivityMonitor: React.FC = () => {
  const [activities, setActivities] = useState<GateActivity[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAlerts, setShowAlerts] = useState<boolean>(true);

  // Mock data cho trạng thái khu vực
  const [areaStatuses] = useState<AreaStatus[]>([
    { name: 'Khu A - Văn Phòng', currentCount: 45, maxCapacity: 100, status: 'normal' },
    { name: 'Khu B - Sản Xuất', currentCount: 82, maxCapacity: 100, status: 'warning' },
    { name: 'Khu C - Kho', currentCount: 18, maxCapacity: 50, status: 'normal' },
    { name: 'Khu D - Nhà Ăn', currentCount: 95, maxCapacity: 100, status: 'full' },
  ]);

  // Cập nhật thời gian real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Giả lập dữ liệu hoạt động
  const simulateActivity = (): void => {
    const employees: Employee[] = [
      { 
        name: 'Nguyễn Thị Mai', 
        id: 'NV001', 
        department: 'Kế Toán', 
        position: 'Kế Toán Trưởng',
        gender: 'Nữ',
        phoneNumber: '0912345678'
      },
      { 
        name: 'Trần Văn Hùng', 
        id: 'NV002', 
        department: 'IT', 
        position: 'Trưởng Phòng IT',
        gender: 'Nam',
        phoneNumber: '0923456789'
      },
      { 
        name: 'Lê Thị Lan', 
        id: 'NV003', 
        department: 'Nhân Sự', 
        position: 'Chuyên Viên',
        gender: 'Nữ',
        phoneNumber: '0934567890'
      },
      { 
        name: 'Phạm Minh Tuấn', 
        id: 'NV004', 
        department: 'Marketing', 
        position: 'Marketing Manager',
        gender: 'Nam',
        phoneNumber: '0945678901'
      },
      { 
        name: 'Hoàng Thị Hoa', 
        id: 'NV005', 
        department: 'Hành Chính', 
        position: 'Nhân Viên',
        gender: 'Nữ',
        phoneNumber: '0956789012'
      },
      { 
        name: 'Đặng Văn Long', 
        id: 'NV006', 
        department: 'Kinh Doanh', 
        position: 'Giám Đốc Kinh Doanh',
        gender: 'Nam',
        phoneNumber: '0967890123'
      },
    ];

    const areas: string[] = [
      'Khu A - Văn Phòng',
      'Khu B - Sản Xuất',
      'Khu C - Kho',
      'Khu D - Nhà Ăn',
      'Khu E - Hội Trường',
      'Cổng Chính'
    ];

    const gates: string[] = ['Cổng A1', 'Cổng A2', 'Cổng B1', 'Cổng B2', 'Cổng C1'];
    const purposes: string[] = ['Công tác', 'Nghỉ trưa', 'Họp', 'Kiểm tra hàng', 'Ra ngoài'];
    const cardTypes: ('RFID' | 'QR' | 'Fingerprint')[] = ['RFID', 'QR', 'Fingerprint'];

    const guards: string[] = [
      'BV Nguyễn Văn An',
      'BV Trần Văn Bình',
      'BV Lê Thị Cúc',
      'BV Phạm Văn Đức'
    ];

    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    const randomFromArea = areas[Math.floor(Math.random() * areas.length)];
    let randomToArea = areas[Math.floor(Math.random() * areas.length)];
    
    while (randomToArea === randomFromArea) {
      randomToArea = areas[Math.floor(Math.random() * areas.length)];
    }
    
    const randomGuard = guards[Math.floor(Math.random() * guards.length)];
    const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)];
    const randomCardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const randomTemp = (35.5 + Math.random() * 2).toFixed(1);
    const isWarning = Math.random() > 0.85; // 15% có cảnh báo

    const newActivity: GateActivity = {
      id: Date.now(),
      employee: randomEmployee,
      fromArea: randomFromArea,
      toArea: randomToArea,
      fromGate: gates[Math.floor(Math.random() * gates.length)],
      toGate: gates[Math.floor(Math.random() * gates.length)],
      time: new Date(),
      guard: randomGuard,
      purpose: randomPurpose,
      status: isWarning ? 'warning' : 'active',
      cardType: randomCardType,
      temperature: parseFloat(randomTemp),
      notes: isWarning ? 'Cần kiểm tra bổ sung' : undefined
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 30));
  };

  // Format functions
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((currentTime.getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds} giây trước`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    return `${hours} giờ trước`;
  };

  // Statistics
  const countRecentActivities = (): number => {
    return activities.filter(a => 
      (currentTime.getTime() - new Date(a.time).getTime()) < 3600000
    ).length;
  };

  const countUniqueEmployees = (): number => {
    return new Set(activities.map(a => a.employee.id)).size;
  };

  const countWarnings = (): number => {
    return activities.filter(a => a.status === 'warning').length;
  };

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'warning' && activity.status === 'warning');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hệ Thống Giám Sát Ra/Vào
                </h1>
                <p className="text-sm text-gray-500">{formatDate(currentTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 font-mono">
                  {formatTime(currentTime)}
                </div>
              </div>
              
              <button
                onClick={simulateActivity}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Camera size={20} />
                <span>Giả Lập Quét Thẻ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Tổng hoạt động */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Tổng Hoạt Động</p>
                <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
                <p className="text-xs text-gray-400 mt-1">Trong hôm nay</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Activity className="text-blue-600" size={32} />
              </div>
            </div>
          </div>

          {/* Hoạt động trong 1h */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Trong 1 Giờ</p>
                <p className="text-3xl font-bold text-gray-900">{countRecentActivities()}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  Đang hoạt động
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <Clock className="text-green-600" size={32} />
              </div>
            </div>
          </div>

          {/* Nhân viên */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Nhân Viên</p>
                <p className="text-3xl font-bold text-gray-900">{countUniqueEmployees()}</p>
                <p className="text-xs text-gray-400 mt-1">Đã di chuyển</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Users className="text-purple-600" size={32} />
              </div>
            </div>
          </div>

          {/* Cảnh báo */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Cảnh Báo</p>
                <p className="text-3xl font-bold text-gray-900">{countWarnings()}</p>
                <p className="text-xs text-orange-600 mt-1 flex items-center">
                  <AlertTriangle size={12} className="mr-1" />
                  Cần kiểm tra
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <Bell className="text-orange-600" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Area Status */}


        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-500" size={20} />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả</option>
                  <option value="warning">Có cảnh báo</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Hiển thị {filteredActivities.length} / {activities.length} hoạt động
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <MapPin className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                Chưa có hoạt động nào
              </h3>
              <p className="text-gray-400">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Nhấn "Giả Lập Quét Thẻ" để xem demo'}
              </p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  activity.status === 'warning' ? 'ring-2 ring-orange-400' : ''
                } ${index === 0 ? 'ring-2 ring-green-400' : ''}`}
              >
                {/* Warning Banner */}
                {activity.status === 'warning' && (
                  <div className="bg-orange-500 text-white px-6 py-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2" size={20} />
                      <span className="font-semibold">Cảnh báo: {activity.notes}</span>
                    </div>
                    <button className="text-white hover:bg-orange-600 px-3 py-1 rounded">
                      Xử lý
                    </button>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    {/* Employee Info */}
                    <div className="flex items-center space-x-4 min-w-[300px]">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg ${
                        activity.employee.gender === 'Nam' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-br from-pink-500 to-pink-600'
                      }`}>
                        {activity.employee.name.split(' ').pop()![0]}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {activity.employee.name}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <User size={14} className="mr-2 text-gray-400" />
                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{activity.employee.id}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Building2 size={14} className="mr-2 text-gray-400" />
                            <span>{activity.employee.department} • {activity.employee.position}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">📱</span>
                            <span>{activity.employee.phoneNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Movement Info */}
                    <div className="flex-1 flex items-center justify-center gap-4 py-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2 font-semibold">RỜI KHỎI</div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 min-w-[200px]">
                          <div className="flex items-center justify-center text-red-700 font-bold mb-1">
                            <MapPin className="mr-2" size={18} />
                            {activity.fromArea}
                          </div>
                          <div className="text-xs text-red-600 font-medium">
                            {activity.fromGate}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <ArrowRight className="text-gray-400 mb-2" size={36} strokeWidth={3} />
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {activity.purpose}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-2 font-semibold">ĐẾN</div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 min-w-[200px]">
                          <div className="flex items-center justify-center text-green-700 font-bold mb-1">
                            <MapPin className="mr-2" size={18} />
                            {activity.toArea}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            {activity.toGate}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time and Details */}
                    <div className="min-w-[250px] space-y-3">
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-indigo-700 mb-1 font-mono">
                          {formatTime(activity.time)}
                        </div>
                        <div className="text-xs text-indigo-600 flex items-center justify-center">
                          <Clock className="mr-1" size={12} />
                          {getTimeAgo(activity.time)}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-gray-600">Bảo vệ:</span>
                          <span className="font-semibold text-gray-900 flex items-center">
                            <Shield size={14} className="mr-1 text-indigo-600" />
                            {activity.guard}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-gray-600">Thiết bị:</span>
                          <span className={`font-semibold px-2 py-1 rounded text-xs ${
                            activity.cardType === 'RFID' ? 'bg-blue-100 text-blue-700' :
                            activity.cardType === 'QR' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {activity.cardType}
                          </span>
                        </div>

                        {activity.temperature && (
                          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-gray-600">Nhiệt độ:</span>
                            <span className={`font-semibold ${
                              activity.temperature > 37.5 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {activity.temperature}°C
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* New Activity Badge */}
                  {index === 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center text-green-600 font-semibold">
                        <CheckCircle2 className="mr-2 animate-bounce" size={20} />
                        Hoạt động mới nhất
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GateActivityMonitor;