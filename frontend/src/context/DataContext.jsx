import { createContext, useContext, useEffect, useState } from "react";
import { seedRooms, seedGuests, seedBookings, seedActivity } from "../data/seed";

const DataContext = createContext();

const KEYS = {
  rooms: "guestflow_rooms",
  guests: "guestflow_guests",
  bookings: "guestflow_bookings",
  activity: "guestflow_activity",
};

function loadOrSeed(key, seed) {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return seed;
    }
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

export function DataProvider({ children }) {
  const [rooms, setRooms] = useState(() => loadOrSeed(KEYS.rooms, seedRooms));
  const [guests, setGuests] = useState(() => loadOrSeed(KEYS.guests, seedGuests));
  const [bookings, setBookings] = useState(() => loadOrSeed(KEYS.bookings, seedBookings));
  const [activity, setActivity] = useState(() => loadOrSeed(KEYS.activity, seedActivity));

  useEffect(() => localStorage.setItem(KEYS.rooms, JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem(KEYS.guests, JSON.stringify(guests)), [guests]);
  useEffect(() => localStorage.setItem(KEYS.bookings, JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem(KEYS.activity, JSON.stringify(activity)), [activity]);

  function logActivity(text) {
    setActivity((prev) => [{ id: Date.now(), text, time: "just now" }, ...prev].slice(0, 12));
  }

  // ---- Rooms ----
  function addRoom(room) {
    setRooms((prev) => [...prev, room]);
    logActivity(`Room ${room.id} added`);
  }
  function updateRoom(id, patch) {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function deleteRoom(id) {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    logActivity(`Room ${id} removed`);
  }

  // ---- Guests ----
  function addGuest(guest) {
    setGuests((prev) => [...prev, guest]);
    return guest;
  }
  function updateGuest(id, patch) {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  }
  function deleteGuest(id) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  // ---- Bookings ----
  function addBooking(booking) {
    setBookings((prev) => [booking, ...prev]);
    updateRoom(booking.roomId, { status: "Occupied" });
    logActivity(`New booking ${booking.id} for ${booking.guestName}`);
  }
  function updateBookingStatus(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      if (status === "Checked-In") updateRoom(booking.roomId, { status: "Occupied" });
      if (status === "Checked-Out" || status === "Cancelled") updateRoom(booking.roomId, { status: "Available" });
      logActivity(`Booking ${id} marked ${status}`);
    }
  }

  const value = {
    rooms, addRoom, updateRoom, deleteRoom,
    guests, addGuest, updateGuest, deleteGuest,
    bookings, addBooking, updateBookingStatus,
    activity, logActivity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
