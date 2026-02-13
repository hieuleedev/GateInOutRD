import { useEffect, useState } from 'react';
import { getAccessLogApi } from '../../services/accessLog.service';
import { LogIn, LogOut, Clock, User, Building2, CreditCard, FileText, Users } from 'lucide-react';

interface AccessLog {
  id: number;
  action: 'IN' | 'OUT';
  gate: string;
  access_time: string;
  factory: { factory_code: string; factory_name: string };
  user: { FullName: string; MailAdress: string; PositionDetail: string };
  card: { card_code: string };
  request?: {
    factory: { factory_name: string };
    planned_out_time: string;
    planned_in_time: string;
    reason: string;
    status: string;
    companions?: Array<{
      id: number;
      user: { FullName: string; MailAdress: string; PositionDetail: string };
    }>;
  };
}

const GateAccessLogs = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getAccessLogApi()
      .then(res => setLogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatTime = (date: string) => new Date(date).toLocaleString('vi-VN');
  
  const filtered = logs.filter(log => filter === 'all' || log.action === filter);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Lịch Sử Ra/Vào</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm"
        >
          <option value="all">Tất cả ({logs.length})</option>
          <option value="OUT">RA ({logs.filter(l => l.action === 'OUT').length})</option>
          <option value="IN">VÀO ({logs.filter(l => l.action === 'IN').length})</option>
        </select>
      </div>

      {/* Logs */}
      {filtered.map((log) => (
        <div
          key={log.id}
          className={`bg-white rounded-lg shadow p-4 hover:shadow-lg transition ${
            log.action === 'OUT' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b">
            <div className="flex items-center gap-2">
              {log.action === 'OUT' ? 
                <LogOut className="text-red-600" size={20} /> : 
                <LogIn className="text-green-600" size={20} />
              }
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                log.action === 'OUT' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {log.action === 'OUT' ? 'RA' : 'VÀO'}
              </span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{log.gate}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock size={16} />
              {formatTime(log.access_time)}
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* User */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <User className="text-gray-400 mt-0.5" size={16} />
                <div>
                  <div className="font-bold text-sm">{log.user.FullName}</div>
                  <div className="text-xs text-gray-600">{log.user.PositionDetail}</div>
                  <div className="text-xs text-gray-500">{log.user.MailAdress}</div>
                </div>
              </div>
             
            </div>

            {/* Factory */}
            <div>
              <div className="flex items-start gap-2">
                <Building2 className="text-gray-400 mt-0.5" size={16} />
                <div>
                  <div className="font-bold text-sm">{log.factory.factory_name}</div>
                  <div className="text-xs text-gray-500">Mã: {log.factory.factory_code}</div>
                </div>
              </div>
            </div>

            {/* Request */}
            {log.request && (
              <div className="bg-orange-50 rounded p-3">
                <div className="flex items-center gap-1 mb-2">
                  <FileText className="text-orange-600" size={16} />
                  <span className="font-bold text-sm">Yêu cầu</span>
                  <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold ${
                    log.request.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {log.request.status}
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div><span className="text-gray-600">Đến:</span> {log.request.factory.factory_name}</div>
                  <div><span className="text-gray-600">Lý do:</span> {log.request.reason}</div>
                  <div className="pt-1 border-t border-orange-200 text-[11px]">
                    <div>Ra: {formatTime(log.request.planned_out_time)}</div>
                    <div>Vào: {formatTime(log.request.planned_in_time)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Companions */}
          {log.request?.companions && log.request.companions.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-1 mb-2">
                <Users className="text-blue-600" size={16} />
                <span className="font-bold text-sm">Người đi cùng ({log.request.companions.length})</span>
              </div>
              <div className="grid md:grid-cols-3 gap-2">
                {log.request.companions.map((c) => (
                  <div key={c.id} className="bg-blue-50 rounded p-2 text-xs">
                    <div className="font-semibold text-gray-900">{c.user.FullName}</div>
                    <div className="text-gray-600">{c.user.PositionDetail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Không có dữ liệu
        </div>
      )}
    </div>
  );
};

export default GateAccessLogs;