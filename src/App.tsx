import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import VerificationCard from "./components/VerificationCard";
import RegistrationFormComponent from "./components/RegistrationFormComponent/RegistrationFormComponent";
import RequestListComponent from "./components/GateManagementList/RequestListComponent/RequestListComponent";
import MainLayout from "./components/MainLayout/MainLayout";
import HistoryGate from "./components/HistoryGate/HistoryGate";
import tokenService from "./services/token.service";
import { useAuthStore } from "./store/auth.store";
import RequestDetail from "./components/access-request-detail/RequestDetail";
import QRLinkGenerator from "./components/QRLinkGenerator/QRLinkGenerator"
export interface AuthState {
  user?: any;
  token?: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
export default function App() {
  
  const token = useAuthStore((s: AuthState) => s.token);
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* ✅ Public – quét QR vào thẳng */}
      <Route path="/gate/:code" element={<VerificationCard />} />

      {/* Protected */}
      <Route
        element={token ? <MainLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="/verify" element={<VerificationCard />} />
        <Route path="/register" element={<RegistrationFormComponent />} />
        <Route path="/requests" element={<RequestListComponent />} />
        <Route path="/history" element={<HistoryGate />} />
        <Route path="/qr" element={<QRLinkGenerator />} />
        <Route path="/access-requests/:id" element={<RequestDetail/>} />
      </Route>

      {/* default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
