import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardPathForRole } from "../context/AuthContext";

/**
 * Wrap a route with this to require auth, optionally restricted to a set of roles.
 * Usage: <ProtectedRoute roles={["manager"]}><Settings /></ProtectedRoute>
 * Omit `roles` to allow any authenticated user, regardless of role.
 */
function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(role)) {
    // Logged in, but this role doesn't have access — send them to their own dashboard.
    return <Navigate to={dashboardPathForRole(role)} replace />;
  }

  return children;
}

export default ProtectedRoute;
