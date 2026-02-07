import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* body */}
      <div className="flex flex-1">
        {/* sidebar */}
        <aside className="w-64r">
          <Sidebar />
        </aside>

        {/* content */}
        <main className="flex-1 bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
