import React, { useState, useRef, useEffect } from "react";
import { Bell, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import logoThaco from "../../assets/LOGO THACO AUTO.png";
import tokenService from "../../services/token.service";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../../services/notification.service";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [openNotify, setOpenNotify] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const fetchData = async () => {
    const res = await getNotification();
   setNotifications(res?.data)
  };
  useEffect(() => {
    fetchData();
  }, []);
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  // đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    tokenService.removeToken();
    logout?.();
    navigate("/login", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/requests");
  };

  const handleGoHistory = () => {
    navigate("/history");
  };

  const handleGoProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="w-full h-16 bg-white border-b flex items-center px-4 md:px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <img
          src={logoThaco}
          alt="THACO AUTO"
          className="h-8 object-contain"
          onClick={handleGoHome}
        />
        <div className="hidden md:block border-l pl-3">
          <h1 className="text-sm font-semibold text-gray-800">
            Đăng ký ra vào cổng trung tâm R&D Ô tô
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-4">
        {/* 🔔 Notification */}
        {/* 🔔 Notification */}
        <div className="relative">
        <button
            onClick={() => setOpenNotify(!openNotify)}
            className="relative p-2 rounded hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-600" />

            {unreadCount > 0 && (
              <span className="
                absolute -top-1 -right-1
                min-w-[18px] h-[18px]
                px-1
                bg-red-500 text-white
                text-[11px] font-semibold
                rounded-full
                flex items-center justify-center
              ">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>


          {/* Dropdown notification */}
          {openNotify && (
            <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
              <div className="px-4 py-2 border-b font-semibold text-sm">
                Thông báo
              </div>

              {notifications.length === 0 && (
                <div className="p-4 text-sm text-gray-500 text-center">
                  Không có thông báo
                </div>
              )}

              {notifications.map((noti) => (
                <div
                  key={noti.id}
                  onClick={() => handleClickNotification(noti)}
                  className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50
            ${!noti.is_read ? "bg-blue-50" : ""}`}>
                  <p className="text-sm font-medium text-gray-800">
                    {noti.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{noti.content}</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {new Date(noti.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
            <img
              src={`${API}/files/${user?.Avatar}`}
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col leading-tight text-left">
              <span className="text-sm font-semibold text-gray-800">
                {user?.FullName}
              </span>
              <span className="text-xs text-gray-500">{user?.Division}</span>
            </div>
          </button>

          {/* Dropdown */}
          {openMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b" onClick={handleGoProfile}>
                <p className="text-sm font-medium text-gray-800">
                  {user?.FullName}
                </p>
                <p className="text-xs text-gray-500">{user?.Division}</p>
              </div>
              <div className="px-4 py-3 border-b">
                <p
                  className="w-full flex items-center gap-2  py-2 text-sm text-gray-500 hover:bg-red-50"
                  onClick={handleGoHistory}>
                  Lịch sử ra vào cổng
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 pointer-events-auto">
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
