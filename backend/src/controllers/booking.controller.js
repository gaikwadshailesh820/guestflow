const bookingService = require("../services/booking.service");
const { httpError } = require("../utils/asyncHandler");

exports.getBookings = async (req, res) => {
  const bookings = await bookingService.getAllBookings();
  res.json(bookings);
};

exports.getBooking = async (req, res) => {
  const booking = await bookingService.getBooking(req.params.id);

  if (!booking) {
    throw httpError(404, `Booking ${req.params.id} not found`);
  }

  res.json(booking);
};

exports.createBooking = async (req, res) => {
  const { roomId, guestId, checkIn, checkOut } = req.body;

  if (!roomId || !guestId || !checkIn || !checkOut) {
    throw httpError(
      400,
      "roomId, guestId, checkIn and checkOut are required"
    );
  }

  const booking = await bookingService.createBooking(req.body);

  res.status(201).json(booking);
};

exports.updateBooking = async (req, res) => {
  const booking = await bookingService.updateBooking(
    req.params.id,
    req.body
  );

  if (!booking) {
    throw httpError(404, `Booking ${req.params.id} not found`);
  }

  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const deleted = await bookingService.deleteBooking(req.params.id);

  if (!deleted) {
    throw httpError(404, `Booking ${req.params.id} not found`);
  }

  res.sendStatus(204);
};