/**
 * In-memory data store.
 *
 * Week 4 uses a plain in-memory array/object as the "database" — a real
 * database (MongoDB) arrives in Week 5. Data resets whenever the server
 * restarts. Seed values intentionally mirror frontend/src/data/seed.js so
 * the UI looks identical whether it's reading localStorage or the API.
 */

const rooms = [
  { id: "101", type: "Deluxe Double", floor: 1, capacity: 2, price: 120, ac: true, status: "Available" },
  { id: "102", type: "Standard Single", floor: 1, capacity: 1, price: 75, ac: false, status: "Occupied" },
  { id: "201", type: "Suite", floor: 2, capacity: 4, price: 280, ac: true, status: "Available" },
  { id: "205", type: "Deluxe Double", floor: 2, capacity: 2, price: 130, ac: true, status: "Occupied" },
  { id: "210", type: "Standard Single", floor: 2, capacity: 1, price: 80, ac: false, status: "Available" },
  { id: "312", type: "Standard Single", floor: 3, capacity: 1, price: 70, ac: false, status: "Maintenance" },
  { id: "315", type: "Suite", floor: 3, capacity: 4, price: 300, ac: true, status: "Available" },
  { id: "320", type: "Deluxe Double", floor: 3, capacity: 2, price: 135, ac: true, status: "Available" },
  { id: "401", type: "Penthouse", floor: 4, capacity: 6, price: 550, ac: true, status: "Available" },
  { id: "410", type: "Deluxe Double", floor: 4, capacity: 2, price: 140, ac: true, status: "Occupied" },
  { id: "415", type: "Standard Single", floor: 4, capacity: 1, price: 78, ac: false, status: "Available" },
  { id: "420", type: "Suite", floor: 4, capacity: 4, price: 290, ac: true, status: "Maintenance" },
];

const guests = [
  { id: "G-1001", name: "James Okafor", email: "james.okafor@mail.com", phone: "+1 415 555 0142", visits: 3 },
  { id: "G-1002", name: "Sara Mitchell", email: "sara.mitchell@mail.com", phone: "+1 415 555 0198", visits: 1 },
  { id: "G-1003", name: "Liu Wei", email: "liu.wei@mail.com", phone: "+86 138 0013 8000", visits: 5 },
  { id: "G-1004", name: "Amara Diop", email: "amara.diop@mail.com", phone: "+221 77 123 4567", visits: 2 },
  { id: "G-1005", name: "Carlos Ruiz", email: "carlos.ruiz@mail.com", phone: "+34 600 123 456", visits: 1 },
];

const bookings = [
  { id: "BK-1041", guestId: "G-1001", guestName: "James Okafor", roomId: "101", checkIn: "2026-06-20", checkOut: "2026-06-24", status: "Confirmed", total: 480 },
  { id: "BK-1040", guestId: "G-1002", guestName: "Sara Mitchell", roomId: "205", checkIn: "2026-06-19", checkOut: "2026-06-21", status: "Checked-In", total: 260 },
  { id: "BK-1039", guestId: "G-1003", guestName: "Liu Wei", roomId: "312", checkIn: "2026-06-15", checkOut: "2026-06-18", status: "Checked-Out", total: 210 },
  { id: "BK-1038", guestId: "G-1004", guestName: "Amara Diop", roomId: "201", checkIn: "2026-06-10", checkOut: "2026-06-12", status: "Cancelled", total: 560 },
  { id: "BK-1037", guestId: "G-1005", guestName: "Carlos Ruiz", roomId: "410", checkIn: "2026-06-08", checkOut: "2026-06-10", status: "Checked-Out", total: 280 },
];

const activity = [
  { id: 1, text: "Room 101 checked in — James Okafor", time: "2 min ago" },
  { id: 2, text: "Room 205 housekeeping completed", time: "15 min ago" },
  { id: 3, text: "New booking #BK-1041 confirmed", time: "28 min ago" },
  { id: 4, text: "Room 312 checked out — Liu Wei", time: "1 hr ago" },
];

/** Adds an entry to the front of the activity log, capped at 12 entries. */
function logActivity(text) {
  activity.unshift({ id: Date.now(), text, time: "just now" });
  activity.length = Math.min(activity.length, 12);
}

/** Finds the highest numeric suffix used for a given id prefix (e.g. "G-" -> 1005). */
function highestSuffix(list, prefix) {
  return list.reduce((max, item) => {
    if (typeof item.id === "string" && item.id.startsWith(prefix)) {
      const n = parseInt(item.id.slice(prefix.length), 10);
      if (!Number.isNaN(n) && n > max) return n;
    }
    return max;
  }, 1000);
}

function nextId(list, prefix) {
  return `${prefix}${highestSuffix(list, prefix) + 1}`;
}

module.exports = { rooms, guests, bookings, activity, logActivity, nextId };
