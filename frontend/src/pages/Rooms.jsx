import { useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { Button, Input, Modal, useToast } from "../components/ui";

const STATUS_STYLE = {
  Available: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Occupied: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Maintenance: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

const emptyForm = { id: "", type: "Standard Single", floor: 1, capacity: 1, price: 75, ac: false, status: "Available" };

function Rooms() {
  const { rooms, addRoom, updateRoom, deleteRoom, guests, bookings, addBooking } = useData();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [assignOpen, setAssignOpen] = useState(false);
  const [assignRoom, setAssignRoom] = useState(null);
  const [assignGuestId, setAssignGuestId] = useState("");
  const [nights, setNights] = useState(2);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const matchesSearch =
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rooms, search, statusFilter]);

  const counts = useMemo(() => ({
    All: rooms.length,
    Available: rooms.filter((r) => r.status === "Available").length,
    Occupied: rooms.filter((r) => r.status === "Occupied").length,
    Maintenance: rooms.filter((r) => r.status === "Maintenance").length,
  }), [rooms]);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }
  function openEditForm(room) {
    setEditingId(room.id);
    setForm(room);
    setFormOpen(true);
  }
  function handleSave(e) {
    e.preventDefault();
    if (!form.id) {
      toast.error("Room number is required.");
      return;
    }
    if (editingId) {
      updateRoom(editingId, form);
      toast.success(`Room ${form.id} updated.`);
    } else {
      if (rooms.some((r) => r.id === form.id)) {
        toast.error(`Room ${form.id} already exists.`);
        return;
      }
      addRoom({ ...form, floor: Number(form.floor), capacity: Number(form.capacity), price: Number(form.price) });
      toast.success(`Room ${form.id} added.`);
    }
    setFormOpen(false);
  }
async function handleDelete(id) {
  if (!confirm(`Delete room ${id}? This can't be undone.`)) {
    return;
  }

  try {
    await deleteRoom(id);
    toast.success(`Room ${id} deleted.`);
  } catch (err) {
    toast.error(err.message);
  }
}

  function openAssign(room) {
    setAssignRoom(room);
    setAssignGuestId(guests[0]?.id || "");
    setNights(2);
    setAssignOpen(true);
  }
  function handleAssign(e) {
    e.preventDefault();
    const guest = guests.find((g) => g.id === assignGuestId);
    if (!guest || !assignRoom) return;
    const checkIn = new Date().toISOString().slice(0, 10);
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + Number(nights));
    const checkOut = checkOutDate.toISOString().slice(0, 10);
    const bookingId = `BK-${1000 + bookings.length + 1}`;
    addBooking({
      id: bookingId,
      guestId: guest.id,
      guestName: guest.name,
      roomId: assignRoom.id,
      checkIn,
      checkOut,
      status: "Checked-In",
      total: assignRoom.price * Number(nights),
    });
    toast.success(`${guest.name} assigned to Room ${assignRoom.id}.`);
    setAssignOpen(false);
  }

  return (
    <AppLayout title="Room Management" search={search} onSearchChange={setSearch}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {["All", "Available", "Occupied", "Maintenance"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${statusFilter === s
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                }`}
            >
              {s} {counts[s]}
            </button>
          ))}
        </div>
        <Button onClick={openAddForm}>+ Add Room</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800">
              <th className="py-3 px-4">Room No.</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Floor</th>
              <th className="py-3 px-4">Capacity</th>
              <th className="py-3 px-4">Price/Night</th>
              <th className="py-3 px-4">AC</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 dark:border-slate-800/60">
                <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-200">{r.id}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{r.type}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{r.floor}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{r.capacity} guests</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">₹{Number(r.price).toLocaleString("en-IN")}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{r.ac ? "Yes" : "No"}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                  <button onClick={() => openEditForm(r)} className="text-blue-600 hover:underline">Edit</button>
                  <button
                    onClick={() => openAssign(r)}
                    disabled={r.status !== "Available"}
                    className={`hover:underline ${r.status !== "Available" ? "text-gray-400 cursor-not-allowed" : "text-green-600"}`}
                  >
                    Assign Guest
                  </button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="py-8 text-center text-gray-400">No rooms match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Room Modal */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={editingId ? `Edit Room ${editingId}` : "Add Room"}>
        <form onSubmit={handleSave}>
          <Input label="Room Number" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="e.g. 501" />
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Room Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl mb-5 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
          >
            <option>Standard Single</option>
            <option>Deluxe Double</option>
            <option>Suite</option>
            <option>Penthouse</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Floor" type="number" min="1" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} />
            <Input label="Capacity" type="number" min="1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
          </div>
          <Input label="Price / Night (₹)" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <label className="flex items-center gap-2 mb-5 text-gray-700 dark:text-gray-200">
            <input type="checkbox" checked={form.ac} onChange={(e) => setForm({ ...form, ac: e.target.checked })} />
            Air Conditioned
          </label>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl mb-6 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
          >
            <option>Available</option>
            <option>Occupied</option>
            <option>Maintenance</option>
          </select>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button type="submit">{editingId ? "Save Changes" : "Add Room"}</Button>
          </div>
        </form>
      </Modal>

      {/* Assign Guest Modal */}
      <Modal isOpen={assignOpen} onClose={() => setAssignOpen(false)} title={`Assign Guest to Room ${assignRoom?.id || ""}`}>
        <form onSubmit={handleAssign}>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">Guest</label>
          <select
            value={assignGuestId}
            onChange={(e) => setAssignGuestId(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl mb-5 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
          >
            {guests.map((g) => <option key={g.id} value={g.id}>{g.name} ({g.email})</option>)}
          </select>
          <Input label="Number of Nights" type="number" min="1" value={nights} onChange={(e) => setNights(e.target.value)} />
          {assignRoom && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Total: <span className="font-semibold text-gray-800 dark:text-white">₹{(assignRoom.price * Number(nights)).toLocaleString("en-IN")}</span>
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setAssignOpen(false)}>Cancel</Button>
            <Button type="submit">Confirm & Check In</Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}

export default Rooms;
