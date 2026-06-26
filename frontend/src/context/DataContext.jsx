import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../api/client";
import { useToast } from "../components/ui";

const DataContext = createContext();

export function DataProvider({ children }) {
  const toast = useToast();

  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshActivity = useCallback(async () => {
    try {
      setActivity(await api.get("/activity"));
    } catch {
      // Non-critical — activity feed silently stays stale if this fails.
    }
  }, []);

  // ---- Initial load: replace localStorage/mock data with real API calls ----
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      try {
        const [roomsData, guestsData, bookingsData, activityData] = await Promise.all([
          api.get("/rooms"),
          api.get("/guests"),
          api.get("/bookings"),
          api.get("/activity"),
        ]);
        if (cancelled) return;
        setRooms(roomsData);
        setGuests(guestsData);
        setBookings(bookingsData);
        setActivity(activityData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        toast.error(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
    // toast identity is stable across renders (ToastProvider uses useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Rooms ----
  async function addRoom(room) {
    const created = await api.post("/rooms", room);
    setRooms((prev) => [...prev, created]);
    refreshActivity();
    return created;
  }
  async function updateRoom(id, patch) {
    const updated = await api.put(`/rooms/${id}`, patch);
    setRooms((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  }
  async function deleteRoom(id) {
    await api.delete(`/rooms/${id}`);
    setRooms((prev) => prev.filter((r) => r.id !== id));
    refreshActivity();
  }

  // ---- Guests ----
  async function addGuest(guest) {
    const created = await api.post("/guests", guest);
    setGuests((prev) => [...prev, created]);
    return created;
  }
  async function updateGuest(id, patch) {
    const updated = await api.put(`/guests/${id}`, patch);
    setGuests((prev) => prev.map((g) => (g.id === id ? updated : g)));
    return updated;
  }
  async function deleteGuest(id) {
    await api.delete(`/guests/${id}`);
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  // ---- Bookings ----
  async function addBooking(booking) {
    const { booking: created, room: updatedRoom } = await api.post("/bookings", booking);
    setBookings((prev) => [created, ...prev]);
    if (updatedRoom) setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    refreshActivity();
    return created;
  }
  async function updateBookingStatus(id, status) {
    const { booking: updated, room: updatedRoom } = await api.put(`/bookings/${id}`, { status });
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    if (updatedRoom) setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    refreshActivity();
    return updated;
  }

  const value = {
    rooms, addRoom, updateRoom, deleteRoom,
    guests, addGuest, updateGuest, deleteGuest,
    bookings, addBooking, updateBookingStatus,
    activity,
    loading, error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
