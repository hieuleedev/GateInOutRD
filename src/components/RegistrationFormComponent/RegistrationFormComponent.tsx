import React, { useState, useEffect } from "react";
import { User, Clock, Plus, Building } from "lucide-react";
import EmployeeMultiSelect from "../select/EmployeeMultiSelect";
import { getAllFactory } from "../../services/factory.service";
import { useAuthStore } from '../../store/auth.store';
import { getUsersInMyDepartment } from "../../services/user.service";
import type { Factory } from '@/services/factory.service';
import {useAccessRequestStore} from '../../store/accessRequest.store'
import { useNavigate } from "react-router-dom";
import Select from "react-select";




interface FormData {
  fullName: string;
  employeeId: string;
  factory_id: string;
  department: string;
  workUnit: string;
  checkInTime: string;
  checkOutTime: string;
  colleagues: string;
  reason: string;
  division: string,
  companions:number[]
}

interface Employee {
  id: number;
  FullName: string;

}



interface FactoryListResponse {
  data: Factory[];
}


const RegistrationFormComponent: React.FC = () => {
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const {createAccessRequest,getAccessRequestsByApprover, regisError,regisSucces} = useAccessRequestStore();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    employeeId: "",
    factory_id: "",
    department: "",
    workUnit: "",
    checkInTime: "",
    checkOutTime: "",
    colleagues: "",
    reason: "",
    companions: [],
    division: ""
  });

  //const [companions, setCompanions] = useState<number[]>([]);
  const [factory, setFactory] = useState<Factory[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // Mock user data - thay thế bằng useAuthStore() của bạn
  const fetchData = async () => {
    const result: FactoryListResponse = await getAllFactory();
    setFactory(result.data);
    const res: any = await getUsersInMyDepartment();
    setEmployees(res.data)
  };
  useEffect(()=>{
    fetchData();
},[])
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.FullName || "",
        employeeId: user.MSNV || "",
        division: user.Division || "",
        department: user.department?.NameDept || "",
      }));
    }
  }, [user]);


  const handleSubmit = async (): Promise<void> => {
    try {
      const res = await createAccessRequest(formData);

      alert(res.data.message || "Tạo yêu cầu thành công ✅");
      navigate('/requests')
      
    } catch (err: any) {
      alert(err?.response?.data?.message || "Có lỗi xảy ra ❌");
    }
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("formdata",formData)
  };

  const handleCompanionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const options = e.target.options;
    const selected: number[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(Number(options[i].value));
      }
    }
   
    setFormData((prev) => ({
      ...prev,
      colleagues: selected.join(', '),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Title Section */}
        <div className="bg-blue-600 text-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Quản Lý Ra Vào Cổng</h1>
              <p className="text-blue-100 text-sm sm:text-base">Trung tâm R&D Ô tô</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                disabled
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã số nhân viên *
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                disabled
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Nhập mã số"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chức vụ *
              </label>
              <input
                type="text"
                name="division"
                disabled
                value={formData.division}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Nhập chức vụ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phòng ban *
              </label>
              <input
                type="text"
                name="workUnit"
                disabled
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Phòng Quản trị dự án"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đơn vị tác nghiệp *
            </label>
            {/* <select
              name="factory_id"
              value={formData.factory_id}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
            >
              <option value="">-- Chọn đơn vị tác nghiệp --</option>
              {factory.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.factory_name}
                </option>
              ))}
            </select> */}
            <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đơn vị tác nghiệp *
          </label>

            <Select
              placeholder="-- Chọn đơn vị tác nghiệp --"
              options={factory.map((f) => ({
                value: String(f.id),
                label: f.factory_name,
              }))}
              value={
                formData.factory_id
                  ? {
                      value: formData.factory_id,
                      label:
                        factory.find((f) => String(f.id) === formData.factory_id)
                          ?.factory_name || "",
                    }
                  : null
              }
              onChange={(option) => {
                setFormData((prev) => ({
                  ...prev,
                  factory_id: option?.value || "",
                }));
              }}
              isSearchable
              styles={{
                menu: (base) => ({
                  ...base,
                  maxHeight: 220,
                  overflowY: "auto",
                  zIndex: 50,
                }),
              }}
            />
          </div>

          </div>
        </div>

        {/* Time Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Thời gian ra vào cổng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian ra *
              </label>
              <input
                type="datetime-local"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian vào *
              </label>
              <input
                type="datetime-local"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Companions */}
         <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Nhân sự đi cùng
          </h2>
          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh sách nhân sự đi cùng (Tùy chọn)
            </label>
            <div className="border border-gray-300 rounded-lg p-3 sm:p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">
                Huỳnh Quang Tạo, Nguyễn Minh Phúc, Trần Văn B
              </p>
            </div>
            <p className="text-xs sm:text-sm text-blue-600 mt-2">
              ✓ Chỉ chọn nhân sự đi cùng phòng ban
            </p>
          </div> */}
              <EmployeeMultiSelect
              employees={employees}
              value={formData.companions}
              onChange={(ids) =>
                setFormData({ ...formData, companions: ids })
              }
        />

        </div> 

        {/* Reason */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Lý do ra / vào cổng
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung lý do *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
              placeholder="Ví dụ: Ra ngoài làm việc với đối tác, xử lý công việc..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Vui lòng ghi rõ lý do để phục vụ xét duyệt
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Gửi đơn đăng ký
        </button>
      </div>
    </div>
  );
};

export default RegistrationFormComponent;