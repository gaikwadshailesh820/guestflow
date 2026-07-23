import { useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { useToast } from "../components/ui";

const STATUS_STYLE = {
  Confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Checked-In": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  "Checked-Out": "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};
const NEXT_STATUS = {
  Confirmed: "Checked-In",
  "Checked-In": "Checked-Out",
};

function Bookings() {
  const { bookings, updateBookingStatus } = useData();
  const toast = useToast();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (!b) return false;

      return (
        (b.id || "").toLowerCase().includes(search.toLowerCase()) ||
        (b.guestName || "").toLowerCase().includes(search.toLowerCase()) ||
        String(b.roomId || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [bookings, search]);

  function advance(b) {
    const next = NEXT_STATUS[b.status];
    if (!next) return;
    updateBookingStatus(b.id, next);
    toast.success(`${b.id} moved to ${next}.`);
  }
  function cancel(b) {
    if (confirm(`Cancel booking ${b.id}?`)) {
      updateBookingStatus(b.id, "Cancelled");
      toast.info(`${b.id} cancelled.`);
    }
  }

  return (
    <AppLayout title="Bookings" search={search} onSearchChange={setSearch}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Room</th>
              <th className="py-3 px-4">Check-In</th>
              <th className="py-3 px-4">Check-Out</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-gray-50 dark:border-slate-800/60">
                <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-200">{b.id}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{b.guestName}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{b.roomId}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                  {b.status === "Confirmed"
                    ? new Date(b.checkIn).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : new Date(b.checkIn).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                </td>

                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                  {b.status === "Confirmed"
                    ? new Date(b.checkOut).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : new Date(b.checkOut).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">₹{b.total.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                </td>
                <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                  {NEXT_STATUS[b.status] && (
                    <button
                      onClick={() => advance(b)}
                      className="text-blue-600 hover:underline"
                    >
                      {b.status === "Confirmed"
                        ? "Check In"
                        : `Mark ${NEXT_STATUS[b.status]}`}
                    </button>
                  )}
                  {b.status !== "Cancelled" && b.status !== "Checked-Out" && (
                    <button onClick={() => cancel(b)} className="text-red-600 hover:underline">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="py-8 text-center text-gray-400">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

export default Bookings;
