import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { useToast } from "../components/ui";
import { Loader } from "../components/ui";

const STATUS_STYLE = {
  Confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Checked-In": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  "Checked-Out": "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const ROOM_STATUS_DOT = {
  Available: "bg-green-500",
  Occupied: "bg-blue-500",
  Maintenance: "bg-red-500",
};

function StatCard({ label, value, sub, color = "text-gray-900 dark:text-white" }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

/**
 * Receptionist / front-desk dashboard — operational view only.
 * No revenue figures and no links to Reports/Settings, which are
 * manager-only sections (enforced again in App.jsx via ProtectedRoute).
 */
function ReceptionistDashboard() {
  const { rooms, bookings, updateBookingStatus } = useData();
  const toast = useToast();
  const [loading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const { arrivals, departures, available, occupied, maintenance } = useMemo(() => {
    return {
      arrivals: bookings.filter((b) => b.checkIn === today && b.status !== "Cancelled"),
      departures: bookings.filter((b) => b.checkOut === today && b.status === "Checked-In"),
      available: rooms.filter((r) => r.status === "Available").length,
      occupied: rooms.filter((r) => r.status === "Occupied").length,
      maintenance: rooms.filter((r) => r.status === "Maintenance").length,
    };
  }, [bookings, rooms, today]);

  function checkIn(b) {
    updateBookingStatus(b.id, "Checked-In");
    toast.success(`${b.guestName} checked in to room ${b.roomId}.`);
  }
  function checkOut(b) {
    updateBookingStatus(b.id, "Checked-Out");
    toast.success(`${b.guestName} checked out of room ${b.roomId}.`);
  }

  return (
    <AppLayout title="Front Desk Dashboard">
      {loading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Today's arrivals, departures, and live room status.
            </p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Receptionist Access
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <StatCard label="Arrivals Today" value={arrivals.length} sub="Guests expected" color="text-blue-600" />
            <StatCard label="Departures Today" value={departures.length} sub="Checking out" color="text-amber-600" />
            <StatCard label="Available Rooms" value={available} sub="Ready to assign" color="text-green-600" />
            <StatCard label="Occupied / Maintenance" value={`${occupied} / ${maintenance}`} sub="Current status" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Today's Arrivals</h2>
              {arrivals.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500">No arrivals scheduled for today.</p>
              ) : (
                <ul className="space-y-3">
                  {arrivals.map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-3 border-b border-gray-50 dark:border-slate-800/60 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{b.guestName}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Room {b.roomId} · {b.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => checkIn(b)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition"
                          >
                            Check In
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Today's Departures</h2>
              {departures.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500">No departures scheduled for today.</p>
              ) : (
                <ul className="space-y-3">
                  {departures.map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-3 border-b border-gray-50 dark:border-slate-800/60 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{b.guestName}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Room {b.roomId} · {b.id}</p>
                      </div>
                      <button
                        onClick={() => checkOut(b)}
                        className="px-3 py-1.5 rounded-lg bg-gray-700 text-white text-xs font-medium hover:bg-gray-800 transition"
                      >
                        Check Out
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Room Status</h2>
              <Link to="/rooms" className="text-sm font-medium text-blue-600 hover:underline">Manage rooms →</Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {rooms.map((r) => (
                <div key={r.id} className="border border-gray-100 dark:border-slate-800 rounded-xl p-3 text-center">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mb-1 ${ROOM_STATUS_DOT[r.status]}`} />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{r.id}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{r.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Link to="/bookings" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">All Bookings →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and update booking statuses.</p>
            </Link>
            <Link to="/guests" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">Guest Directory →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Look up guest contact &amp; visit history.</p>
            </Link>
            <Link to="/ai-recommend" className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 dark:text-white">AI Recommend →</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Match a walk-in guest to the best room.</p>
            </Link>
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default ReceptionistDashboard;
