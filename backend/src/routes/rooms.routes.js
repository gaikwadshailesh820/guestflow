const express = require("express");
const { rooms, logActivity } = require("../data/store");
const { asyncHandler, httpError } = require("../utils/asyncHandler");

const router = express.Router();

// GET /api/rooms — list all rooms
router.get("/", asyncHandler(async (req, res) => {
  res.status(200).json(rooms);
}));

// GET /api/rooms/:id — get a single room
router.get("/:id", asyncHandler(async (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id);
  if (!room) throw httpError(404, `Room ${req.params.id} not found`);
  res.status(200).json(room);
}));

// POST /api/rooms — create a room
router.post("/", asyncHandler(async (req, res) => {
  const { id, type, price } = req.body;

  if (!id || !type || price === undefined) {
    throw httpError(400, "id, type and price are required");
  }
  if (typeof price !== "number" || price < 0) {
    throw httpError(400, "price must be a non-negative number");
  }
  if (rooms.some((r) => r.id === id)) {
    throw httpError(400, `Room ${id} already exists`);
  }

  const room = {
    id: String(id),
    type,
    floor: Number(req.body.floor) || 1,
    capacity: Number(req.body.capacity) || 1,
    price,
    ac: Boolean(req.body.ac),
    status: req.body.status || "Available",
  };

  rooms.push(room);
  logActivity(`Room ${room.id} added`);
  res.status(201).json(room);
}));

// PUT /api/rooms/:id — update a room
router.put("/:id", asyncHandler(async (req, res) => {
  const idx = rooms.findIndex((r) => r.id === req.params.id);
  if (idx === -1) throw httpError(404, `Room ${req.params.id} not found`);

  if (req.body.price !== undefined && (typeof req.body.price !== "number" || req.body.price < 0)) {
    throw httpError(400, "price must be a non-negative number");
  }

  rooms[idx] = { ...rooms[idx], ...req.body, id: rooms[idx].id };
  res.status(200).json(rooms[idx]);
}));

// DELETE /api/rooms/:id — delete a room
router.delete("/:id", asyncHandler(async (req, res) => {
  const idx = rooms.findIndex((r) => r.id === req.params.id);
  if (idx === -1) throw httpError(404, `Room ${req.params.id} not found`);

  const [removed] = rooms.splice(idx, 1);
  logActivity(`Room ${removed.id} removed`);
  res.status(204).send();
}));

module.exports = router;
