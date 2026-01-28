import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import VerificationCard from "./components/VerificationCard";
import RegistrationFormComponent from "./components/RegistrationFormComponent/RegistrationFormComponent";
import RequestListComponent from "./components/GateManagementList/RequestListComponent/RequestListComponent";
import MainLayout from "./components/MainLayout/MainLayout";
import HistoryGate from "./components/HistoryGate/HistoryGate";
import tokenService from "./services/token.service";
import RequestDetail from "./components/access-request-detail/RequestDetail";

export default function App() {
  const token = tokenService.getToken();

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
        <Route path="/access-request/:id" element={<RequestDetail/>} />
      </Route>

      {/* default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
