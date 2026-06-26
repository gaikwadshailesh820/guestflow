const express = require("express");
const { guests, nextId } = require("../data/store");
const { asyncHandler, httpError } = require("../utils/asyncHandler");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/guests/search?q=... — search guests by name/email/phone
// Registered BEFORE /:id so "search" isn't treated as a guest id.
router.get("/search", asyncHandler(async (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  if (!q) return res.status(200).json(guests);

  const results = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      (g.phone || "").toLowerCase().includes(q)
  );
  res.status(200).json(results);
}));

// GET /api/guests — list all guests
router.get("/", asyncHandler(async (req, res) => {
  res.status(200).json(guests);
}));

// GET /api/guests/:id — get a single guest
router.get("/:id", asyncHandler(async (req, res) => {
  const guest = guests.find((g) => g.id === req.params.id);
  if (!guest) throw httpError(404, `Guest ${req.params.id} not found`);
  res.status(200).json(guest);
}));

// POST /api/guests — create a guest
router.post("/", asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) throw httpError(400, "name and email are required");
  if (!EMAIL_RE.test(email)) throw httpError(400, "email is not a valid email address");

  const id = req.body.id || nextId(guests, "G-");
  if (guests.some((g) => g.id === id)) {
    throw httpError(400, `Guest ${id} already exists`);
  }

  const guest = {
    id,
    name,
    email,
    phone: req.body.phone || "",
    visits: Number(req.body.visits) || 0,
  };

  guests.push(guest);
  res.status(201).json(guest);
}));

// PUT /api/guests/:id — update a guest
router.put("/:id", asyncHandler(async (req, res) => {
  const idx = guests.findIndex((g) => g.id === req.params.id);
  if (idx === -1) throw httpError(404, `Guest ${req.params.id} not found`);

  if (req.body.email !== undefined && !EMAIL_RE.test(req.body.email)) {
    throw httpError(400, "email is not a valid email address");
  }

  guests[idx] = { ...guests[idx], ...req.body, id: guests[idx].id };
  res.status(200).json(guests[idx]);
}));

// DELETE /api/guests/:id — delete a guest
router.delete("/:id", asyncHandler(async (req, res) => {
  const idx = guests.findIndex((g) => g.id === req.params.id);
  if (idx === -1) throw httpError(404, `Guest ${req.params.id} not found`);

  guests.splice(idx, 1);
  res.status(204).send();
}));

module.exports = router;
