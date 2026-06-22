import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "guestflow_users";
const SESSION_KEY = "guestflow_session";

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);
  // seed two demo accounts — one per role — so the Login page's demo
  // credentials actually work and the role split is visible immediately.
  const seeded = [
    { email: "admin@guestflow.com", password: "admin123", name: "Admin User", role: "manager" },
    { email: "reception@guestflow.com", password: "reception123", name: "Reception Desk", role: "receptionist" },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

export const ROLES = {
  MANAGER: "manager",
  RECEPTIONIST: "receptionist",
};

export function dashboardPathForRole(role) {
  return role === ROLES.MANAGER ? "/dashboard/manager" : "/dashboard/receptionist";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  function login(email, password) {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password." };
    setUser({ email: found.email, name: found.name, role: found.role || ROLES.RECEPTIONIST });
    return { ok: true, role: found.role || ROLES.RECEPTIONIST };
  }

  function signup(name, email, password, role = ROLES.RECEPTIONIST) {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = { name, email, password, role };
    const updated = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    setUser({ email, name, role });
    return { ok: true, role };
  }

  function logout() {
    setUser(null);
  }

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
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
