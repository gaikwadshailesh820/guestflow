import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardPathForRole } from "../context/AuthContext";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    if (!token || !role) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("guestflow_session", JSON.stringify({
      id: params.get("id"),
      name: params.get("name"),
      email: params.get("email"),
      role,
    }));
    navigate(dashboardPathForRole(role), { replace: true });
  }, [navigate]);

  return null;
}

export default OAuthCallback;
