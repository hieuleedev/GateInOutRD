import React, { useState, useEffect } from "react";
import { User, Clock, Plus, Building } from "lucide-react";
import EmployeeMultiSelect from '../../components/select/EmployeeMultiSelect';
import { getAllFactory } from "../../services/factory.service";
import { useAuthStore } from '../../store/auth.store';

const RegistrationFormComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    factory_id: "",
    department: "",
    workUnit: "",
    checkInTime: "",
    checkOutTime: "",
    colleagues: "",
    reason: "",
  });
  const {user} = useAuthStore();
  console.log("ủe",user);
  const [companions, setCompanions] = useState<number[]>([]);
  const fetchData = async ()=>{
    const result = await getAllFactory();
    console.log("re",result)
  }
  useEffect(() => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      fullName: user.FullName || "",
      employeeId: user.MSNV || "",
      factory_id: user.Division || "",
      department: user.department?.NameDept || "",
    }));
  }
}, [user]);

  useEffect(()=>{
      fetchData();
  },[])

 const employees: any[] = [
  {
    id: 1,
    name: 'Huỳnh Quang Tạo',
    code: 'NV001',
    department: 'R&D Ô tô'
  },
  {
    id: 2,
    name: 'Nguyễn Minh Phúc',
    code: 'NV002',
    department: 'R&D Ô tô'
  },
  {
    id: 3,
    name: 'Trần Văn B',
    code: 'NV003',
    department: 'Kỹ thuật'
  },
  {
    id: 4,
    name: 'Lê Thị C',
    code: 'NV004',
    department: 'Kỹ thuật'
  },
  {
    id: 5,
    name: 'Phạm Minh D',
    code: 'NV005',
    department: 'Sản xuất'
  },
  {
    id: 6,
    name: 'Võ Thị E',
    code: 'NV006',
    department: 'Sản xuất'
  },
  {
    id: 7,
    name: 'Đặng Văn F',
    code: 'NV007',
    department: 'Bảo trì'
  }
];


  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Đơn đăng ký đã được gửi thành công!");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Quản Lý Ra Vào Cổng
              </h2>
              <p className="text-sm text-gray-500">Trung tâm R&D Ô tô</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Thông tin cá nhân
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  disabled
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã số nhân viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeId"
                  disabled
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="1504326"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức vụ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="factory_id"
                  disabled
                  value={formData.factory_id}
                  onChange={handleChange}
                  placeholder="Kỹ sư"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  disabled
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Phòng Quản trị dữ liệu"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đơn vị tác nghiệp <span className="text-red-500">*</span>
              </label>
              <select
                name="workUnit"
                value={formData.workUnit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Chọn đơn vị tác nghiệp --</option>
                <option value="NM Tài">NM Tài</option>
                <option value="NM ANMC">NM ANMC</option>
                <option value="NM Kỹ thuật">NM Kỹ thuật</option>
                <option value="NM Sản xuất">NM Sản xuất</option>
              </select>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Thời gian ra vào cổng
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian vào <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="checkInTime"
                    value={formData.checkInTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian ra <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="checkOutTime"
                    value={formData.checkOutTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Nhân sự đi cùng
              </h4>

              {/* <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Danh sách nhân sự (Tùy chọn)
                </label>
                <select
                  name="colleagues"
                  value={formData.colleagues}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">-- Chọn nhân sự đi cùng --</option>
                  <option value="Huỳnh Quang Tạo, Nguyễn Minh Phúc">
                    Huỳnh Quang Tạo, Nguyễn Minh Phúc
                  </option>
                  <option value="Trần Văn B, Lê Thị C">
                    Trần Văn B, Lê Thị C
                  </option>
                  <option value="Phạm Minh D">Phạm Minh D</option>
                  <option value="Võ Thị E, Đặng Văn F">
                    Võ Thị E, Đặng Văn F
                  </option>
                </select>
              </div> */}
              <EmployeeMultiSelect
                employees={employees}        // danh sách nhân sự [{id, name, code}]
                value={companions}           // mảng id đã chọn
                onChange={setCompanions}     // callback nhận mảng id
              />

              <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Chỉ chọn nhân sự đi cùng phòng ban
              </p>
              <div className="pt-4 border-t">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Lý do ra / vào cổng
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung lý do <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Ví dụ: Ra ngoài làm việc với đối tác, xử lý công việc cá nhân, kiểm tra thiết bị..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Vui lòng ghi rõ lý do để phục vụ xét duyệt
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-6">
              <Plus className="w-5 h-5" />
              Gửi đơn đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormComponent;
