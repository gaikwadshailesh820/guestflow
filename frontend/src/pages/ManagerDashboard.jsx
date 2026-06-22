import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { Loader } from "../components/ui";

function StatCard({ label, value, sub, color = "text-gray-900 dark:text-white" }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

const STATUS_STYLE = {
  Confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Checked-In": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  "Checked-Out": "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

/**
 * Manager / Admin dashboard — full operational + financial overview.
 * Visible only to users with role "manager" (see ProtectedRoute in App.jsx).
 */
function ManagerDashboard() {
  const { rooms, bookings, activity } = useData();
  const [loading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const total = rooms.length;
    const available = rooms.filter((r) => r.status === "Available").length;
    const occupied = rooms.filter((r) => r.status === "Occupied").length;
    const maintenance = rooms.filter((r) => r.status === "Maintenance").length;
    const revenue = bookings
      .filter((b) => b.status !== "Cancelled")
      .reduce((sum, b) => sum + b.total, 0);
    const checkinsToday = bookings.filter((b) => b.checkIn === today).length;
    const checkoutsToday = bookings.filter((b) => b.checkOut === today).length;
    const occupancyRate = total ? Math.round((occupied / total) * 100) : 0;
    return { total, available, occupied, maintenance, revenue, checkinsToday, checkoutsToday, occupancyRate };
  }, [rooms, bookings, today]);

  return (
    <AppLayout title="Manager Dashboard">
      {loading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Full property overview — occupancy, revenue, and staff activity.
            </p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              Manager Access
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            <StatCard label="Total Rooms" value={stats.total} sub="All registered rooms" />
            <StatCard label="Available" value={stats.available} sub="Ready for check-in" color="text-green-600" />
            <StatCard label="Occupied" value={stats.occupied} sub="Currently checked in" color="text-blue-600" />
            <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} sub="Total from bookings" color="text-purple-600" />
            <StatCard label="Occupancy Rate" value={`${stats.occupancyRate}%`} sub="Occupied / total rooms" color="text-amber-600" />
            <StatCard label="Maintenance" value={stats.maintenance} sub="Rooms under maintenance" color="text-red-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Bookings</h2>
                <Link to="/bookings" className="text-sm font-medium text-blue-600 hover:underline">View all →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800">
                      <th className="py-2 pr-4">Booking ID</th>
                      <th className="py-2 pr-4">Guest</th>
                      <th className="py-2 pr-4">Room</th>
                      <th className="py-2 pr-4">Check-In</th>
                      <th className="py-2 pr-4">Check-Out</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 6).map((b) => (
                      <tr key={b.id} className="border-b border-gray-50 dark:border-slate-800/60">
                        <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-200">{b.id}</td>
                        <td className="py-3 pr-4 text-gray-700 dark:text-gray-200">{b.guestName}</td>
                        <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{b.roomId}</td>
                        <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{b.checkIn}</td>
                        <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{b.checkOut}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
              <ul className="space-y-4">
                {activity.slice(0, 7).map((a) => (
                  <li key={a.id} className="text-sm">
                    <p className="text-gray-700 dark:text-gray-200">{a.text}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{a.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link to="/reports" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">View Reports →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Occupancy trends &amp; revenue breakdown.</p>
            </Link>
            <Link to="/settings" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">Hotel Settings →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage profile, billing, and integrations.</p>
            </Link>
            <Link to="/ai-recommend" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">AI Recommend →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Match a guest to the best available room.</p>
            </Link>
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default ManagerDashboard;
