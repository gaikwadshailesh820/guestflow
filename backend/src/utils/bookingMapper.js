const { BookingStatus } = require("@prisma/client");

// Prisma -> Frontend
function toApiBooking(booking) {
  return {
    id: booking.bookingCode,
    guestId: booking.guest?.guestCode || null,
    guestName: booking.guest?.name || "",
    roomId: booking.room?.roomNumber || "",
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    adults: booking.adults,
    children: booking.children,
    total: booking.total,
    notes: booking.notes,
    status: {
      CONFIRMED: "Confirmed",
      CHECKED_IN: "Checked-In",
      CHECKED_OUT: "Checked-Out",
      CANCELLED: "Cancelled",
    }[booking.status],
  };
}

// Frontend -> Prisma
function toDbBooking(data, guestId, roomId) {
  return {
    bookingCode: data.id ?? data.bookingCode,
    guestId,
    roomId,
    checkIn: new Date(data.checkIn),
    checkOut: new Date(data.checkOut),
    adults: Number(data.adults) || 1,
    children: Number(data.children) || 0,
    total: Number(data.total) || 0,
    notes: data.notes || "",
    status: {
      CONFIRMED: BookingStatus.CONFIRMED,
      CHECKED_IN: BookingStatus.CHECKED_IN,
      CHECKED_OUT: BookingStatus.CHECKED_OUT,
      CANCELLED: BookingStatus.CANCELLED,

      "Confirmed": BookingStatus.CONFIRMED,
      "Checked-In": BookingStatus.CHECKED_IN,
      "Checked-Out": BookingStatus.CHECKED_OUT,
      Cancelled: BookingStatus.CANCELLED,
    }[data.status] || BookingStatus.CONFIRMED,
  };
}

module.exports = {
  toApiBooking,
  toDbBooking,
};