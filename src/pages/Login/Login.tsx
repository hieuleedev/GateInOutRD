import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, token } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('Msnv');
  const [showDropdown, setShowDropdown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const domains = ['Msnv', 'Mail'];
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/requests", { replace: true });
    } catch (error) {
      console.error('Login failed', error);
      // TODO: show toast / error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* Left Side - Phần màu xanh (ẩn trên mobile) */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-500 to-blue-400 p-10 flex-col justify-between text-white">
  {/* Top */}
        <div className="text-3xl font-bold tracking-wider text-center">
          THACO AUTO
        </div>

        {/* Middle */}
        <div className="text-center">
          <p className="text-3xl font-bold tracking-wider mb-3">
            Trung Tâm R&D Ô Tô
          </p>
          <p className="text-lg font-medium opacity-95 leading-relaxed">
            Chuyển dịch hoạt động doanh nghiệp lên môi trường số
          </p>
        </div>

        {/* Bottom */}

        <div>
          <h1 className="text-4xl font-light mb-4 tracking-wide text-center">
            Đăng nhập
          </h1>
          {/* <p className="text-base opacity-95 text-center">
            Trung Tâm R&D Ô Tô
          </p> */}
        </div>
      </div>


        {/* Right Side - Form đăng nhập */}
        <div className="w-full lg:w-3/5 p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              TRUNG TÂM R&D Ô TÔ
            </h2>
            <p className="text-sm text-gray-500">
              Hệ thống đăng ký ra vào cổng 
            </p>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-8">
            ĐĂNG NHẬP
          </h3>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Tên đăng nhập */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Vui lòng nhập Mã số nhân viên"
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Checkbox và Quên mật khẩu */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Ghi nhớ đăng nhập
                </span>
              </label>
            </div>

            {/* Button Đăng nhập */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
            >
              ĐĂNG NHẬP
            </button>

            {/* Quên mật khẩu */}
            <div className="text-center">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2026 (CÔNG TY) TRUNG TÂM R&D Ô TÔ</p>
            <p className="mt-1">
              Bảo mật thông tin • Liên hệ:{' '}
              <a href="mailto:rd-cntt@thaco.com.vn" className="text-blue-600 hover:underline">
                rd-cntt@thaco.com.vn
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;