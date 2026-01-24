import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import VerificationCard from "./components/VerificationCard";
import RegistrationFormComponent from "./components/RegistrationFormComponent/RegistrationFormComponent";
import RequestListComponent from "./components/GateManagementList/RequestListComponent/RequestListComponent";
import MainLayout from "./components/MainLayout/MainLayout";
import tokenService from "./services/token.service";

export default function App() {
  const token = tokenService.getToken();
  console.log("token", token);

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected layout */}
      <Route element={token ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/verify" element={<VerificationCard />} />
        <Route path="/register" element={<RegistrationFormComponent />} />
        <Route path="/requests" element={<RequestListComponent />} />
      </Route>

      {/* default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
