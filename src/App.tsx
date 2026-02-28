import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Login from "./pages/Login/Login";
import VerificationCard from "./components/VerificationCard";
import VerificationCardPrivate from "./components/verificationCardPrivate/VerificationCardPrivate";
import RegistrationFormComponent from "./components/RegistrationFormComponent/RegistrationFormComponent";
import RequestListComponent from "./components/GateManagementList/RequestListComponent/RequestListComponent";
import MainLayout from "./components/MainLayout/MainLayout";
import HistoryGate from "./components/HistoryGate/HistoryGate";
import tokenService from "./services/token.service";
import { useAuthStore } from "./store/auth.store";
import RequestDetail from "./components/access-request-detail/RequestDetail";
import QRLinkGenerator from "./components/QRLinkGenerator/QRLinkGenerator"
import GateActivityMonitor from "./components/gate-activity-monitor/GateActivityMonitor";
import { getFCMToken, onForegroundMessage } from "./lib/fcm";
import { saveFcmToken } from "./services/fcmToken.service";
import ProfilePage from "./pages/profile/ProfilePage";
export interface AuthState {
  user?: any;
  token?: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
export default function App() {
  
  const token = useAuthStore((s: AuthState) => s.token);
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
  
    (async () => {
      // 1) foreground listener
      await onForegroundMessage((payload) => {
        console.log("🔔 Foreground FCM:", payload);
  
        const title = payload?.notification?.title ?? "Thông báo";
        const body = payload?.notification?.body ?? "";
  
        if (Notification.permission === "granted") {
          new Notification(title, { body });
        }
      });
  
      // 2) token
      const token: any = await getFCMToken();
      if (!token) return;
  
      const oldToken = localStorage.getItem("fcm_token");
  
      // chỉ update DB nếu token đổi
      if (token !== oldToken) {
        await saveFcmToken(token);
        localStorage.setItem("fcm_token", token);
        console.log("✅ FCM token saved:", token);
      } else {
        console.log("ℹ️ FCM token unchanged");
      }
    })();
  }, []);
  

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* ✅ Public – quét QR vào thẳng */}
     

      {/* Protected */}
      <Route
        element={token ? <MainLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="/gate/:code" element={<VerificationCard />} />
        <Route path="/la/:code" element={<VerificationCardPrivate />} />
        <Route path="/verify" element={<VerificationCard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegistrationFormComponent />} />
        <Route path="/requests" element={<RequestListComponent />} />
        <Route path="/history" element={<HistoryGate />} />
        <Route path="/qr" element={<QRLinkGenerator />} />
        <Route path="/access-requests/:id" element={<RequestDetail/>} />
        <Route path="/monitor" element={<GateActivityMonitor />} />
      </Route>

      {/* default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
