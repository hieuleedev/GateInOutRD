import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Factory,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  UserCheck,

} from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import type { LucideIcon } from "lucide-react";
interface MenuItem {
  label: string;
  path: string;
  icon:  LucideIcon;
  badge?: number;
}

const menus: MenuItem[] = [
  { label: "Trang chủ", path: "/requests", icon: LayoutDashboard },
  { label: "Lịch sử ra vào cổng", path: "/monitor", icon: UserCheck, badge: 5 },
  // { label: "Lịch phòng họp", path: "/schedule", icon: Calendar },
  // { label: "Đơn xin phép", path: "/applications", icon: FileText },
  // { label: "Nhân viên", path: "/users", icon: Users },
  // { label: "Nhà máy", path: "/factories", icon: Factory },
  // { label: "Phòng ban", path: "/departments", icon: Building2 },
  // { label: "Cài đặt", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const { user} = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log("user",user)
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`relative h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
>


        <div className="flex flex-col h-full">
          {/* Logo Section */}
          {/* <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TA</span>
                </div>
                <span className="font-bold text-lg text-gray-800">
                  THACO AUTO
                </span>
              </div>
            )}
            {isCollapsed && (
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">TA</span>
              </div>
            )}
          </div> */}

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-15 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menus.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 ${
                              isActive ? "text-blue-600" : "text-gray-500"
                            }`}
                          />
                          {!isCollapsed && (
                            <>
                              <span className="font-medium text-sm flex-1">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                          {isCollapsed && item.badge && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                          {/* Tooltip for collapsed state */}
                          {isCollapsed && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                              {item.label}
                              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-gray-200 p-3">
            {!isCollapsed && (
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  LT
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    Lê Trung Hiếu
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Công Nghệ Thông Tin
                  </p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  LT
                </div>
              </div>
            )}
            <button
              onClick={() => alert("Logout")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Đăng xuất</span>
              )}
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  Đăng xuất
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Your main content goes here */}
      </div>
    </>
  );
}