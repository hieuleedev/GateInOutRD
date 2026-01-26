import React, { useState, useMemo } from 'react';

/**
 * Types
 */
export interface Employee {
  id: number;
  FullName: string;
  code?: string;
  department?: string;
}

interface EmployeeMultiSelectProps {
  employees: Employee[];
  value: number[];                     // danh sách id đã chọn
  onChange: (ids: number[]) => void;   // callback trả về mảng id
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Component
 */
const EmployeeMultiSelect: React.FC<EmployeeMultiSelectProps> = ({
  employees = [],
  value = [],
  onChange,
  placeholder = 'Tìm theo tên hoặc mã nhân viên...',
  disabled = false
}) => {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const filteredEmployees = useMemo<Employee[]>(() => {
    const q = search.toLowerCase();
    return employees.filter(e =>
      e.FullName.toLowerCase().includes(q) ||
      (e.code && e.code.toLowerCase().includes(q))
    );
  }, [search, employees]);

  const toggle = (id: number) => {
    if (disabled) return;

    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const selectedNames = useMemo<string>(() => {
    return employees
      .filter(e => value.includes(e.id))
      .map(e => e.FullName)
      .join(', ');
  }, [employees, value]);

  return (
    <div className="relative">
      <label className="block text-sm text-gray-600 mb-1">
        Danh sách nhân sự đi cùng (Tùy chọn)
      </label>

      {/* Input */}
      <div
        className={`w-full px-3 py-2 border rounded-lg cursor-text bg-white ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && setOpen(true)}
      >
        {value.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <span className="text-gray-700 text-sm">{selectedNames}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow">
          {/* Search */}
          <input
            autoFocus
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder={placeholder}
            className="w-full px-3 py-2 border-b focus:outline-none"
          />

          {/* List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredEmployees.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-400">
                Không tìm thấy nhân sự
              </div>
            )}

            {filteredEmployees.map(emp => (
              <label
                key={emp.id}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(emp.id)}
                  onChange={() => toggle(emp.id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  {emp.FullName}
                  {emp.code && (
                    <span className="text-gray-400"> ({emp.code})</span>
                  )}
                </span>
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-3 py-2 border-t text-xs">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => onChange([])}
            >
              Bỏ chọn tất cả
            </button>
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={() => setOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeMultiSelect;
