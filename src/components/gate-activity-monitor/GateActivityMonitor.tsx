import React, { useState, useEffect } from 'react';
import { 
  LogIn, LogOut, Users, Bell, Search, Filter, AlertTriangle, Calendar
} from 'lucide-react';
import GateAccessLogs from './GateAccessLogs.tsx';
import { getAccessLogApi } from '../../services/accessLog.service';

interface AccessLog {
  id: number;
  action: 'IN' | 'OUT';
  access_time: string;
  user: {
    id: number;
    FullName: string;
  };
}

interface DailyStats {
  totalIn: number;
  totalOut: number;
  uniqueEmployees: number;
  date: string;
}

const GateActivityMonitor: React.FC = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch data from API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getAccessLogApi();
        console.log('API Response:', res); // Debug
        console.log('Logs data:', res.data); // Debug
        setLogs(res.data || []);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setLogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Cập nhật thời gian real-time
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // Format ngày hiện tại
  const formatCurrentDate = (): string => {
    return currentTime.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Thống kê tất cả (không lọc theo ngày)
  const getDailyStats = (): DailyStats => {
    console.log('Total logs:', logs.length); // Debug
    
    // Đếm IN
    const totalIn = logs.filter(log => {
      console.log('Log action:', log.action); // Debug
      return log.action === 'IN';
    }).length;
    
    // Đếm OUT
    const totalOut = logs.filter(log => log.action === 'OUT').length;
    
    // Đếm nhân viên unique
    const uniqueUserIds = new Set(logs.map(log => log.user?.id).filter(id => id));
    
    console.log('Stats:', { totalIn, totalOut, uniqueEmployees: uniqueUserIds.size }); // Debug

    return {
      totalIn,
      totalOut,
      uniqueEmployees: uniqueUserIds.size,
      date: formatCurrentDate()
    };
  };

  const dailyStats = getDailyStats();

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user?.FullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1800px] mx-auto px-5 py-6">
        
        {/* Date Display */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-center gap-3">
            <Calendar className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">{dailyStats.date}</h2>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Tổng vào */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Vào</p>
                <p className="text-3xl font-bold text-gray-900">{dailyStats.totalIn}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <LogIn size={12} className="mr-1" />
                  Lượt vào
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <LogIn className="text-green-600" size={32} />
              </div>
            </div>
          </div>

          {/* Tổng ra */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Ra</p>
                <p className="text-3xl font-bold text-gray-900">{dailyStats.totalOut}</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <LogOut size={12} className="mr-1" />
                  Lượt ra
                </p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <LogOut className="text-red-600" size={32} />
              </div>
            </div>
          </div>

          {/* Nhân viên */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Nhân Viên</p>
                <p className="text-3xl font-bold text-gray-900">{dailyStats.uniqueEmployees}</p>
                <p className="text-xs text-gray-400 mt-1">Người khác nhau</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Users className="text-purple-600" size={32} />
              </div>
            </div>
          </div>

          {/* Tổng hoạt động */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Tổng</p>
                <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center">
                  <AlertTriangle size={12} className="mr-1" />
                  Tổng lượt
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Bell className="text-blue-600" size={32} />
              </div>
            </div>
          </div>
        </div>
        {/* Gate Access Logs Component */}
        <GateAccessLogs/>
      </div>
    </div>
  );
};

export default GateActivityMonitor;