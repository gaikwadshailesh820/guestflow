import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Guests from "./pages/Guests";
import Reports from "./pages/Reports";
import AIRecommend from "./pages/AIRecommend";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth, dashboardPathForRole, ROLES } from "./context/AuthContext";

/** Sends a logged-in user straight to the dashboard for their role. */
function DashboardRedirect() {
  const { role } = useAuth();
  return <Navigate to={dashboardPathForRole(role)} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Generic /dashboard sends each role to its own dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
      <Route
        path="/dashboard/manager"
        element={<ProtectedRoute roles={[ROLES.MANAGER]}><ManagerDashboard /></ProtectedRoute>}
      />
      <Route
        path="/dashboard/receptionist"
        element={<ProtectedRoute roles={[ROLES.RECEPTIONIST]}><ReceptionistDashboard /></ProtectedRoute>}
      />

      {/* Shared operational pages — both roles can access */}
      <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/guests" element={<ProtectedRoute><Guests /></ProtectedRoute>} />
      <Route path="/ai-recommend" element={<ProtectedRoute><AIRecommend /></ProtectedRoute>} />

      {/* Manager-only pages */}
      <Route path="/reports" element={<ProtectedRoute roles={[ROLES.MANAGER]}><Reports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute roles={[ROLES.MANAGER]}><Settings /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
