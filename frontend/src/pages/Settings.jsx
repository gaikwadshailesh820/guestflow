import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, Input, useToast } from "../components/ui";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const PROFILE_KEY = "guestflow_profile";

function loadProfile(user) {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (raw) return JSON.parse(raw);
  return {
    firstName: user?.name?.split(" ")[0] || "Admin",
    lastName: user?.name?.split(" ")[1] || "User",
    email: user?.email || "",
    phone: "",
    hotelName: "GuestFlow Demo Hotel",
    currency: "USD",
  };
}

function Settings() {
  const { darkMode, setDarkMode } = useTheme();
  const { user } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(() => loadProfile(user));

  function save(e) {
    e.preventDefault();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    toast.success("Settings saved.");
  }

  return (
    <AppLayout title="Settings">
      <form onSubmit={save} className="max-w-2xl space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
            <Input label="Last Name" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          </div>
          <Input label="Email Address" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <Input label="Phone Number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Hotel Information</h2>
          <Input label="Hotel Name" value={profile.hotelName} onChange={(e) => setProfile({ ...profile, hotelName: e.target.value })} />
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Currency</label>
          <select
            value={profile.currency}
            onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
            <option>GBP</option>
          </select>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">Dark / Light Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle interface theme — your choice is saved.</p>
            </div>
            <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 rounded-full p-1">
              <button type="button" onClick={() => setDarkMode(false)} className={`px-4 py-2 rounded-full text-sm font-medium ${!darkMode ? "bg-white dark:bg-slate-700 shadow text-gray-800 dark:text-white" : "text-gray-500"}`}>☀ Light</button>
              <button type="button" onClick={() => setDarkMode(true)} className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode ? "bg-white dark:bg-slate-700 shadow text-gray-800 dark:text-white" : "text-gray-500"}`}>☾ Dark</button>
            </div>
          </div>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </AppLayout>
  );
}

export default Settings;
