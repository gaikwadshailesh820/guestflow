import { useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useData } from "../context/DataContext";
import { Button, Input, Modal, useToast } from "../components/ui";

function Guests() {
  const { guests, addGuest, deleteGuest, bookings } = useData();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  // Safe fallback normalization ensuring array status before execution
  const safeGuestsArray = Array.isArray(guests) ? guests : (guests?.data || []);

  const filtered = useMemo(() => {
    return safeGuestsArray.filter((g) => {
      const nameMatch = g?.name ? String(g.name).toLowerCase().includes(search.toLowerCase()) : false;
      const emailMatch = g?.email ? String(g.email).toLowerCase().includes(search.toLowerCase()) : false;
      const codeMatch = g?.guestCode ? String(g.guestCode).toLowerCase().includes(search.toLowerCase()) : false;
      return nameMatch || emailMatch || codeMatch;
    });
  }, [safeGuestsArray, search]);

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    
    // Generate the human-readable layout label
    const incrementalCode = `G-${1000 + safeGuestsArray.length + 1}`;
    
    // Pass structural properties down to your Context database action dispatcher
    addGuest({ 
      guestCode: incrementalCode, 
      ...form, 
      visits: 0 
    });
    
    toast.success(`${form.name} added successfully.`);
    setForm({ name: "", email: "", phone: "", address: "" });
    setOpen(false);
  }

  function handleDelete(g) {
    const hasBookings = bookings?.some(
      (b) => (b.guestId === g.id) && b.status !== "Cancelled" && b.status !== "Checked-Out"
    );
    
    if (hasBookings) {
      toast.error(`${g.name || 'Guest'} has an active booking — cancel it first.`);
      return;
    }
    
    if (confirm(`Remove guest ${g.name || 'this profiles record'}?`)) {
      deleteGuest(g.id);
      toast.info("Guest record removed.");
    }
  }

  return (
    <AppLayout title="Guests" search={search} onSearchChange={setSearch}>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setOpen(true)}>+ Add Guest</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g) => (
          <div key={g.id || Math.random()} className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {g?.name ? String(g.name).charAt(0).toUpperCase() : "?"}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{g?.name || "Unnamed Profile"}</p>
                {/* Correctly renders the human-readable layout label code instead of raw id string */}
                <p className="text-xs text-blue-500 font-medium">{g?.guestCode || "No Code Assigned"}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{g?.email || "No Email Provided"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{g?.phone || "No Phone Number"}</p>
            {g?.address && <p className="text-xs text-gray-400 mt-1 italic">{g.address}</p>}
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                {(g?.visits || 0)} visit{(g?.visits || 0) === 1 ? "" : "s"}
              </span>
              <button onClick={() => handleDelete(g)} className="text-red-600 text-sm hover:underline">Remove</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-400 col-span-full text-center py-10">No guests found.</p>}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Guest">
        <form onSubmit={handleAdd}>
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@mail.com" />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="City, State" />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add Guest</Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}

export default Guests;