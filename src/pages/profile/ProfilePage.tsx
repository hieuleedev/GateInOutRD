import { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Upload, Camera, Lock, Eye, EyeOff, Check } from "lucide-react";

interface Department {
  id: number;
  NameDept: string;
}

interface User {
  id: number;
  Admin: number;
  Avatar: string;
  Division: string;
  FullName: string;
  IDDepartment: number;
  IDPosition: number;
  MSNV: string;
  department: Department;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: 383,
    Admin: 0,
    Avatar: "avatar/Lê Trung Hiếu23103096.jpg",
    Division: "Công Nghệ Thông Tin",
    FullName: "Lê Trung Hiếu",
    IDDepartment: 5,
    IDPosition: 6,
    MSNV: "23103096",
    department: {
      id: 5,
      NameDept: "Phòng Quản trị dữ liệu",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const API = import.meta.env.VITE_API_URL;

  const handleChange =
    <K extends keyof User>(key: K) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setUser((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  // Handle avatar upload
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB!");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("FullName", user.FullName);
      formData.append("Division", user.Division);
      formData.append("IDDepartment", user.IDDepartment.toString());
      formData.append("IDPosition", user.IDPosition.toString());

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      // TODO: call API PUT /user/profile
      console.log("SUBMIT PAYLOAD:", formData);

      await new Promise((r) => setTimeout(r, 800));
      alert("Cập nhật thông tin thành công!");
      setSelectedFile(null);
      setAvatarPreview(null);
    } catch (error) {
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);
    try {
      // TODO: call API POST /user/change-password
      const payload = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
      console.log("CHANGE PASSWORD:", payload);

      await new Promise((r) => setTimeout(r, 800));
      alert("Đổi mật khẩu thành công!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowChangePassword(false);
    } catch (error) {
      alert("Đổi mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 25, label: "Yếu", color: "bg-red-500" };
    if (password.length < 8)
      return { strength: 50, label: "Trung bình", color: "bg-yellow-500" };
    if (password.length < 12)
      return { strength: 75, label: "Tốt", color: "bg-blue-500" };
    return { strength: 100, label: "Rất tốt", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Thông tin cá nhân
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Quản lý thông tin và bảo mật tài khoản của bạn
              </p>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              <Lock className="h-4 w-4" />
              Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Change Password Section */}
        {showChangePassword && (
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-blue-100 p-2">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Đổi mật khẩu
                </h2>
                <p className="text-sm text-slate-500">
                  Cập nhật mật khẩu để bảo mật tài khoản
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 pl-4 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 pl-4 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength */}
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">
                        Độ mạnh mật khẩu:
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 pl-4 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {passwordData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    {passwordData.newPassword ===
                    passwordData.confirmPassword ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">
                          Mật khẩu khớp
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-red-500">
                        Mật khẩu không khớp
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Profile Form */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b border-slate-200">
              <div className="relative group">
                <img
                  src={
                    avatarPreview ||
                    `${API}/files/${user.Avatar}` ||
                    "/default-avatar.png"
                  }
                  alt="avatar"
                  className="h-32 w-32 rounded-full border-4 border-slate-200 object-cover shadow-md transition-transform group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
                >
                  <Camera className="h-4 w-4" />
                </button>
                {selectedFile && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 shadow-lg">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {selectedFile ? "Đổi ảnh khác" : "Tải ảnh lên"}
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  JPG, PNG hoặc GIF. Tối đa 5MB
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* MSNV */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mã số nhân viên
                </label>
                <input
                  value={user.MSNV}
                  disabled
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  value={user.FullName}
                  onChange={handleChange("FullName")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Division
                </label>
                <input
                  value={user.Division}
                  onChange={handleChange("Division")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nhập division"
                />
              </div>

              {/* Phòng ban */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <select
                  value={user.IDDepartment}
                  onChange={handleChange("IDDepartment")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value={5}>Phòng Quản trị dữ liệu</option>
                  <option value={6}>Phòng Kỹ thuật</option>
                  <option value={7}>Phòng Nhân sự</option>
                </select>
              </div>

              {/* Chức vụ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chức vụ <span className="text-red-500">*</span>
                </label>
                <select
                  value={user.IDPosition}
                  onChange={handleChange("IDPosition")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value={6}>Nhân viên</option>
                  <option value={7}>Trưởng phòng</option>
                  <option value={8}>Quản lý</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang lưu...
                  </span>
                ) : (
                  "Lưu thay đổi"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}