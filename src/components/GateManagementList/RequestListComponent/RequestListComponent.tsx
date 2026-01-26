import React, { useEffect, useState } from 'react';
import {
  Clock,
  Building,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCards from './StatsCards';
import { useAccessRequestStore } from '../../../store/accessRequest.store';
import ApproveRejectActions from './ApproveRejectActions';

/* ================== TYPES ================== */
export type TabType = 'all' | 'pending' | 'approved' | 'rejected';

/* ================== COMPONENT ================== */
const RequestListComponent: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('pending');

  const {
    getAccessRequestsByApprover,
    stats,
   
  } = useAccessRequestStore();

  /* ================== EFFECT ================== */
  useEffect(() => {
    getAccessRequestsByApprover();
  }, [getAccessRequestsByApprover]);

  /* ================== HELPERS ================== */
  const renderCount = (count?: number) => (
    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
      {count ?? 0}
    </span>
  );

  const handleRegisterForm = () => {
    navigate('/register');
  };

  /* ================== RENDER ================== */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">

          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Quản Lý Ra Vào Cổng
                </h2>
                <p className="text-sm text-gray-500">
                  Trung tâm R&D Ô tô
                </p>
              </div>
            </div>

            <button
              onClick={handleRegisterForm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              Tạo đơn mới
            </button>
          </div>

          {/* ===== STATS CARDS ===== */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.pending ?? 0}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã duyệt</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.approved ?? 0}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Từ chối</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.rejected ?? 0}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* ===== TABS ===== */}
          <div className="flex gap-2 mb-6 border-b">
            <TabButton
              label="Tất cả"
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
              count={stats?.total}
            />
            <TabButton
              label="Chờ duyệt"
              active={activeTab === 'pending'}
              onClick={() => setActiveTab('pending')}
              count={stats?.pending}
            />
            <TabButton
              label="Đã duyệt"
              active={activeTab === 'approved'}
              onClick={() => setActiveTab('approved')}
              count={stats?.approved}
            />
            <TabButton
              label="Từ chối"
              active={activeTab === 'rejected'}
              onClick={() => setActiveTab('rejected')}
              count={stats?.rejected}
            />
          </div>

          {/* ===== LIST ===== */}
          <StatsCards activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default RequestListComponent;

/* ================== TAB BUTTON ================== */
type TabButtonProps = {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({
  label,
  active,
  count,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium flex items-center transition ${
      active
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
      {count ?? 0}
    </span>
  </button>
);
