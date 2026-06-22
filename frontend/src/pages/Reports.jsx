import { useMemo } from "react";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";

function Reports() {
  const { rooms, bookings } = useData();

  const byType = useMemo(() => {
    const map = {};
    rooms.forEach((r) => {
      map[r.type] = map[r.type] || { total: 0, occupied: 0 };
      map[r.type].total += 1;
      if (r.status === "Occupied") map[r.type].occupied += 1;
    });
    return map;
  }, [rooms]);

  const revenueByStatus = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      map[b.status] = (map[b.status] || 0) + b.total;
    });
    return map;
  }, [bookings]);

  const occupancyRate = rooms.length
    ? Math.round((rooms.filter((r) => r.status === "Occupied").length / rooms.length) * 100)
    : 0;

  return (
    <AppLayout title="Reports">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Overall Occupancy</h2>
          <p className="text-5xl font-bold text-blue-600">{occupancyRate}%</p>
          <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-700 mt-4 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${occupancyRate}%` }} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Revenue by Booking Status</h2>
          <ul className="space-y-3">
            {Object.entries(revenueByStatus).map(([status, total]) => (
              <li key={status} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{status}</span>
                <span className="font-semibold text-gray-800 dark:text-white">${total.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Occupancy by Room Type</h2>
          <div className="space-y-4">
            {Object.entries(byType).map(([type, { total, occupied }]) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{type}</span>
                  <span className="text-gray-500 dark:text-gray-400">{occupied}/{total} occupied</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${total ? (occupied / total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Reports;
