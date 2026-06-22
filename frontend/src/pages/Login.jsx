import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, useToast } from "../components/ui";
import { useAuth, dashboardPathForRole, ROLES } from "../context/AuthContext";

function Login() {
  const { login, signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({
    name: "",
    email: "admin@guestflow.com",
    password: "admin123",
    role: ROLES.RECEPTIONIST,
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result =
      mode === "login"
        ? login(form.email, form.password)
        : signup(form.name, form.email, form.password, form.role);

    if (!result.ok) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    navigate(dashboardPathForRole(result.role));
  }

  function fillDemo(role) {
    if (role === ROLES.MANAGER) {
      setForm({ ...form, email: "admin@guestflow.com", password: "admin123" });
    } else {
      setForm({ ...form, email: "reception@guestflow.com", password: "reception123" });
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {mode === "login" ? "Welcome Back" : "Create Your Account"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {mode === "login" ? "Sign in to continue to GuestFlow" : "Start managing your hotel with GuestFlow"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-1">
            {mode === "signup" && (
              <>
                <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" required />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={ROLES.RECEPTIONIST}>Receptionist — front desk</option>
                    <option value={ROLES.MANAGER}>Manager / Admin — full access</option>
                  </select>
                </div>
              </>
            )}
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" required />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" error={error} required />

            {mode === "login" && (
              <div className="flex justify-between items-center text-sm mb-4">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <input type="checkbox" /> Remember Me
                </label>
                <button type="button" className="text-blue-600 hover:underline">Forgot Password?</button>
              </div>
            )}

            <Button type="submit" className="w-full">{mode === "login" ? "Sign In" : "Create Account"}</Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              className="text-blue-600 font-medium hover:underline"
            >
              {mode === "login" ? "Create Free Account" : "Sign In"}
            </button>
          </p>

          {mode === "login" && (
            <div className="mt-8 rounded-xl bg-blue-50 dark:bg-slate-700 p-4 space-y-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300">Demo Credentials</p>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">Manager</p>
                  <p className="text-gray-600 dark:text-gray-300">admin@guestflow.com / admin123</p>
                </div>
                <button type="button" onClick={() => fillDemo(ROLES.MANAGER)} className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 hover:bg-blue-100 dark:hover:bg-slate-500 transition">
                  Use this
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">Receptionist</p>
                  <p className="text-gray-600 dark:text-gray-300">reception@guestflow.com / reception123</p>
                </div>
                <button type="button" onClick={() => fillDemo(ROLES.RECEPTIONIST)} className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 hover:bg-blue-100 dark:hover:bg-slate-500 transition">
                  Use this
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;
