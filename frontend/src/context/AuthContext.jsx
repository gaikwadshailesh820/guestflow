import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const SESSION_KEY = "guestflow_session";

export const ROLES = {
  MANAGER: "manager",
  RECEPTIONIST: "receptionist",
};

export function dashboardPathForRole(role) {
  return role === ROLES.MANAGER
    ? "/dashboard/manager"
    : "/dashboard/receptionist";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem("token");
    return raw && token ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.message || "Login failed.",
        };
      }

      localStorage.setItem("token", data.token);

      const loggedInUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role.toLowerCase(),
      };

      setUser(loggedInUser);

      return {
        ok: true,
        role: loggedInUser.role,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Unable to connect to server.",
      };
    }
  };

  const signup = async (name, email, password, role = "RECEPTIONIST") => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: role.toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          error: data.message,
        };
      }

      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: "Unable to connect to server.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guestflow_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
        isManager: user?.role === ROLES.MANAGER,
        isReceptionist: user?.role === ROLES.RECEPTIONIST,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
