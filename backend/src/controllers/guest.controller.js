const guestService = require("../services/guest.service");
const { httpError } = require("../utils/asyncHandler");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.searchGuests = async (req, res) => {
  const guests = await guestService.searchGuests(req.query.q || "");
  res.json(guests);
};

exports.getGuests = async (req, res) => {
  const guests = await guestService.getAllGuests();
  res.json(guests);
};

exports.getGuest = async (req, res) => {
  const guest = await guestService.getGuest(req.params.id);

  if (!guest) {
    throw httpError(404, `Guest ${req.params.id} not found`);
  }

  res.json(guest);
};

exports.createGuest = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw httpError(400, "name and email are required");
  }

  if (!EMAIL_RE.test(email)) {
    throw httpError(400, "Invalid email address");
  }

  const guest = await guestService.createGuest(req.body);

  res.status(201).json(guest);
};

exports.updateGuest = async (req, res) => {
  if (
    req.body.email &&
    !EMAIL_RE.test(req.body.email)
  ) {
    throw httpError(400, "Invalid email address");
  }

  const guest = await guestService.updateGuest(
    req.params.id,
    req.body
  );

  if (!guest) {
    throw httpError(404, `Guest ${req.params.id} not found`);
  }

  res.json(guest);
};

exports.deleteGuest = async (req, res) => {
  const deleted = await guestService.deleteGuest(req.params.id);

  if (!deleted) {
    throw httpError(404, `Guest ${req.params.id} not found`);
  }

  res.sendStatus(204);
};