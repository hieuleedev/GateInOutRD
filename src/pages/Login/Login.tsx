import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login ,token} = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('Msnv');
  const [showDropdown, setShowDropdown] = useState(false);

  const domains = ['Msnv', 'Mail'];
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);

      // ✅ login OK → chuyển trang
      if(token){
        navigate('/requests');
      }
      
    } catch (error) {
      console.error('Login failed', error);
      // TODO: show toast / error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-400 p-8 flex-col justify-center text-white">
          <h1 className="text-3xl font-light mb-3 tracking-wide">
            Đăng nhập
          </h1>
          <p className="text-sm opacity-95 mb-6">
            Trung Tâm R&D Ô Tô
          </p>

          <div className="mt-auto text-2xl font-bold tracking-wider">
            THACO AUTO
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-blue-50 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Username"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-50 rounded text-gray-600 flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {domain}
                  <ChevronDown size={14} />
                </button>

                {showDropdown && (
                  <div className="absolute top-full mt-1 right-0 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
                    {domains.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDomain(d);
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-blue-50 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="••••••••••••"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              Đăng nhập
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
