const prisma = require("../lib/prisma");
const { toApiBooking, toDbBooking } = require("../utils/bookingMapper");

async function getAllBookings() {
  const bookings = await prisma.booking.findMany({
    include: {
      guest: true,
      room: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings.map(toApiBooking);
}

async function getBooking(id) {
  const booking = await prisma.booking.findUnique({
    where: {
      bookingCode: id,
    },
    include: {
      guest: true,
      room: true,
    },
  });

  if (!booking) return null;

  return toApiBooking(booking);
}

async function createBooking(data) {
  const bookingCode = data.bookingCode || data.id;

  const guest = await prisma.guest.findUnique({
    where: {
      guestCode: data.guestId,
    },
  });

  if (!guest) {
    throw new Error(`Guest ${data.guestId} not found`);
  }

  const room = await prisma.room.findUnique({
    where: {
      roomNumber: data.roomId,
    },
  });

  if (!room) {
    throw new Error(`Room ${data.roomId} not found`);
  }

  const booking = await prisma.booking.create({
    data: {
      ...toDbBooking(data, guest.id, room.id),
      bookingCode,
    },
    include: {
      guest: true,
      room: true,
    },
  });

  await prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      status: "OCCUPIED",
    },
  });

  await prisma.activity.create({
    data: {
      title: "Booking Created",
      description: `Booking ${bookingCode} created for ${guest.name}`,
      type: "BOOKING",
    },
  });

  return toApiBooking(booking);
}

async function updateBooking(id, data) {
  const existing = await prisma.booking.findUnique({
    where: {
      bookingCode: id,
    },
    include: {
      guest: true,
      room: true,
    },
  });

  if (!existing) return null;

  // Handle actual check-in time and checkout calculation
  let actualCheckIn = existing.checkIn;
  let actualCheckOut = existing.checkOut;

  if (data.status === "Checked-In") {
    // Calculate the original stay duration
    const oldCheckIn = new Date(existing.checkIn);
    const oldCheckOut = new Date(existing.checkOut);

    const stayDuration =
      oldCheckOut.getTime() - oldCheckIn.getTime();

    // Guest's actual check-in time
    actualCheckIn = new Date();

    // Checkout time = actual check-in + original stay duration
    actualCheckOut = new Date(
      actualCheckIn.getTime() + stayDuration
    );
  }

  const booking = await prisma.booking.update({
    where: {
      bookingCode: id,
    },
    data: {
      status:
        data.status === "Checked-In"
          ? "CHECKED_IN"
          : data.status === "Checked-Out"
            ? "CHECKED_OUT"
            : data.status === "Cancelled"
              ? "CANCELLED"
              : "CONFIRMED",

      checkIn:
        data.status === "Checked-In"
          ? actualCheckIn
          : existing.checkIn,

      checkOut:
        data.status === "Checked-In"
          ? actualCheckOut
          : existing.checkOut,

      total:
        data.total !== undefined
          ? Number(data.total)
          : existing.total,

      notes:
        data.notes !== undefined
          ? data.notes
          : existing.notes,

      adults:
        data.adults !== undefined
          ? Number(data.adults)
          : existing.adults,

      children:
        data.children !== undefined
          ? Number(data.children)
          : existing.children,
    },
    include: {
      guest: true,
      room: true,
    },
  });

  if (booking.status === "CHECKED_IN") {
    await prisma.room.update({
      where: {
        id: booking.room.id,
      },
      data: {
        status: "OCCUPIED",
      },
    });
  }

  if (
    booking.status === "CHECKED_OUT" ||
    booking.status === "CANCELLED"
  ) {
    await prisma.room.update({
      where: {
        id: booking.room.id,
      },
      data: {
        status: "AVAILABLE",
      },
    });
  }

  await prisma.activity.create({
    data: {
      title: "Booking Updated",
      description: `Booking ${id} updated`,
      type: "BOOKING",
    },
  });

  return toApiBooking(booking);
}

async function deleteBooking(id) {
  const booking = await prisma.booking.findUnique({
    where: {
      bookingCode: id,
    },
    include: {
      room: true,
    },
  });

  if (!booking) return false;

  await prisma.room.update({
    where: {
      id: booking.room.id,
    },
    data: {
      status: "AVAILABLE",
    },
  });

  await prisma.booking.delete({
    where: {
      bookingCode: id,
    },
  });

  await prisma.activity.create({
    data: {
      title: "Booking Deleted",
      description: `Booking ${id} deleted`,
      type: "BOOKING",
    },
  });

  return true;
}

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};