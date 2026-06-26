const express = require("express");
const { rooms, bookings, logActivity, nextId } = require("../data/store");
const { asyncHandler, httpError } = require("../utils/asyncHandler");

const router = express.Router();

const VALID_STATUSES = ["Confirmed", "Checked-In", "Checked-Out", "Cancelled"];

// GET /api/bookings — list all bookings
router.get("/", asyncHandler(async (req, res) => {
  res.status(200).json(bookings);
}));

// GET /api/bookings/:id — get a single booking
router.get("/:id", asyncHandler(async (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) throw httpError(404, `Booking ${req.params.id} not found`);
  res.status(200).json(booking);
}));

// POST /api/bookings — create a booking (also flips the room to Occupied)
router.post("/", asyncHandler(async (req, res) => {
  const { roomId, guestName, checkIn, checkOut } = req.body;

  if (!roomId || !guestName || !checkIn || !checkOut) {
    throw httpError(400, "roomId, guestName, checkIn and checkOut are required");
  }

  const room = rooms.find((r) => r.id === roomId);
  if (!room) throw httpError(400, `Invalid roomId — room ${roomId} does not exist`);

  const id = req.body.id || nextId(bookings, "BK-");
  if (bookings.some((b) => b.id === id)) {
    throw httpError(400, `Booking ${id} already exists`);
  }

  const booking = {
    id,
    guestId: req.body.guestId || null,
    guestName,
    roomId,
    checkIn,
    checkOut,
    status: req.body.status || "Confirmed",
    total: Number(req.body.total) || 0,
  };

  bookings.unshift(booking);
  room.status = "Occupied";
  logActivity(`New booking ${booking.id} for ${booking.guestName}`);

  res.status(201).json({ booking, room });
}));

// PUT /api/bookings/:id — update a booking (status changes cascade to the room)
router.put("/:id", asyncHandler(async (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) throw httpError(404, `Booking ${req.params.id} not found`);

  if (req.body.status !== undefined && !VALID_STATUSES.includes(req.body.status)) {
    throw httpError(400, `status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  Object.assign(booking, req.body, { id: booking.id });

  let updatedRoom = null;
  if (req.body.status) {
    const room = rooms.find((r) => r.id === booking.roomId);
    if (room) {
      if (req.body.status === "Checked-In") room.status = "Occupied";
      if (req.body.status === "Checked-Out" || req.body.status === "Cancelled") room.status = "Available";
      updatedRoom = room;
    }
    logActivity(`Booking ${booking.id} marked ${req.body.status}`);
  }

  res.status(200).json({ booking, room: updatedRoom });
}));

// DELETE /api/bookings/:id — delete a booking
router.delete("/:id", asyncHandler(async (req, res) => {
  const idx = bookings.findIndex((b) => b.id === req.params.id);
  if (idx === -1) throw httpError(404, `Booking ${req.params.id} not found`);

  bookings.splice(idx, 1);
  res.status(204).send();
}));

module.exports = router;
