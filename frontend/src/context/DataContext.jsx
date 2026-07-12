import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../api/client";
import { useToast } from "../components/ui";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export function DataProvider({ children }) {
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshActivity = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const data = await api.get("/activity");
      setActivity(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);

      try {
        const [roomsData, guestsData, bookingsData, activityData] =
          await Promise.all([
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

        if (err.status !== 401) {
          setError(err.message);
          toast.error(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (isAuthenticated) {
      loadAll();
    } else {
      setRooms([]);
      setGuests([]);
      setBookings([]);
      setActivity([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, toast]);

  // ---------------- ROOMS ----------------

  async function addRoom(room) {
    const created = await api.post("/rooms", room);

    setRooms((prev) => [...prev, created]);

    refreshActivity();

    return created;
  }

  async function updateRoom(id, patch) {
    const updated = await api.put(`/rooms/${id}`, patch);

    setRooms((prev) =>
      prev.map((room) => (room.id === id ? updated : room))
    );

    return updated;
  }

  async function deleteRoom(id) {
    await api.delete(`/rooms/${id}`);

    setRooms((prev) => prev.filter((room) => room.id !== id));

    refreshActivity();
  }

  // ---------------- GUESTS ----------------

  async function addGuest(guest) {
    const created = await api.post("/guests", guest);

    setGuests((prev) => [...prev, created]);

    return created;
  }

  async function updateGuest(id, patch) {
    const updated = await api.put(`/guests/${id}`, patch);

    setGuests((prev) =>
      prev.map((guest) => (guest.id === id ? updated : guest))
    );

    return updated;
  }

  async function deleteGuest(id) {
    await api.delete(`/guests/${id}`);

    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  }

  // ---------------- BOOKINGS ----------------

  async function addBooking(booking) {
    const created = await api.post("/bookings", booking);

    setBookings((prev) => [created, ...prev]);

    const latestRooms = await api.get("/rooms");
    setRooms(latestRooms);

    refreshActivity();

    return created;
  }

  async function updateBookingStatus(id, status) {
    const updated = await api.put(`/bookings/${id}`, {
      status,
    });

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? updated : booking
      )
    );

    const latestRooms = await api.get("/rooms");
    setRooms(latestRooms);

    refreshActivity();

    return updated;
  }

  const value = {
    rooms,
    guests,
    bookings,
    activity,

    loading,
    error,

    addRoom,
    updateRoom,
    deleteRoom,

    addGuest,
    updateGuest,
    deleteGuest,

    addBooking,
    updateBookingStatus,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
}