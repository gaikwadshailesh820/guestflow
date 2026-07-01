const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  await prisma.activity.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.room.deleteMany();

  // =========================
  // ROOMS
  // =========================

  const room101 = await prisma.room.create({
    data: {
      roomNumber: "101",
      type: "DELUXE_DOUBLE",
      floor: 1,
      capacity: 2,
      price: 120,
      ac: true,
      status: "AVAILABLE",
    },
  });

  const room102 = await prisma.room.create({
    data: {
      roomNumber: "102",
      type: "STANDARD_SINGLE",
      floor: 1,
      capacity: 1,
      price: 75,
      ac: false,
      status: "OCCUPIED",
    },
  });

  const room201 = await prisma.room.create({
    data: {
      roomNumber: "201",
      type: "SUITE",
      floor: 2,
      capacity: 4,
      price: 280,
      ac: true,
      status: "AVAILABLE",
    },
  });

  const room205 = await prisma.room.create({
    data: {
      roomNumber: "205",
      type: "DELUXE_DOUBLE",
      floor: 2,
      capacity: 2,
      price: 130,
      ac: true,
      status: "OCCUPIED",
    },
  });

  const room210 = await prisma.room.create({
    data: {
      roomNumber: "210",
      type: "STANDARD_SINGLE",
      floor: 2,
      capacity: 1,
      price: 80,
      ac: false,
      status: "AVAILABLE",
    },
  });

  const room312 = await prisma.room.create({
    data: {
      roomNumber: "312",
      type: "STANDARD_SINGLE",
      floor: 3,
      capacity: 1,
      price: 70,
      ac: false,
      status: "MAINTENANCE",
    },
  });

  const room315 = await prisma.room.create({
    data: {
      roomNumber: "315",
      type: "SUITE",
      floor: 3,
      capacity: 4,
      price: 300,
      ac: true,
      status: "AVAILABLE",
    },
  });

  const room320 = await prisma.room.create({
    data: {
      roomNumber: "320",
      type: "DELUXE_DOUBLE",
      floor: 3,
      capacity: 2,
      price: 135,
      ac: true,
      status: "AVAILABLE",
    },
  });

  const room401 = await prisma.room.create({
    data: {
      roomNumber: "401",
      type: "PENTHOUSE",
      floor: 4,
      capacity: 6,
      price: 550,
      ac: true,
      status: "AVAILABLE",
    },
  });

  const room410 = await prisma.room.create({
    data: {
      roomNumber: "410",
      type: "DELUXE_DOUBLE",
      floor: 4,
      capacity: 2,
      price: 140,
      ac: true,
      status: "OCCUPIED",
    },
  });

  const room415 = await prisma.room.create({
    data: {
      roomNumber: "415",
      type: "STANDARD_SINGLE",
      floor: 4,
      capacity: 1,
      price: 78,
      ac: false,
      status: "AVAILABLE",
    },
  });

  const room420 = await prisma.room.create({
    data: {
      roomNumber: "420",
      type: "SUITE",
      floor: 4,
      capacity: 4,
      price: 290,
      ac: true,
      status: "MAINTENANCE",
    },
  });

  // =========================
  // GUESTS
  // =========================

  const guest1 = await prisma.guest.create({
    data: {
      guestCode: "G-1001",
      name: "James Okafor",
      email: "james.okafor@mail.com",
      phone: "+1 415 555 0142",
      visits: 3,
    },
  });

  const guest2 = await prisma.guest.create({
    data: {
      guestCode: "G-1002",
      name: "Sara Mitchell",
      email: "sara.mitchell@mail.com",
      phone: "+1 415 555 0198",
      visits: 1,
    },
  });

  const guest3 = await prisma.guest.create({
    data: {
      guestCode: "G-1003",
      name: "Liu Wei",
      email: "liu.wei@mail.com",
      phone: "+86 138 0013 8000",
      visits: 5,
    },
  });

  const guest4 = await prisma.guest.create({
    data: {
      guestCode: "G-1004",
      name: "Amara Diop",
      email: "amara.diop@mail.com",
      phone: "+221 77 123 4567",
      visits: 2,
    },
  });

  const guest5 = await prisma.guest.create({
    data: {
      guestCode: "G-1005",
      name: "Carlos Ruiz",
      email: "carlos.ruiz@mail.com",
      phone: "+34 600 123 456",
      visits: 1,
    },
  });

    // =========================
  // BOOKINGS
  // =========================

  await prisma.booking.create({
    data: {
      bookingCode: "BK-1041",
      guestId: guest1.id,
      roomId: room101.id,
      checkIn: new Date("2026-06-20"),
      checkOut: new Date("2026-06-24"),
      adults: 2,
      children: 0,
      total: 480,
      status: "CONFIRMED",
    },
  });

  await prisma.booking.create({
    data: {
      bookingCode: "BK-1040",
      guestId: guest2.id,
      roomId: room205.id,
      checkIn: new Date("2026-06-19"),
      checkOut: new Date("2026-06-21"),
      adults: 1,
      children: 0,
      total: 260,
      status: "CHECKED_IN",
    },
  });

  await prisma.booking.create({
    data: {
      bookingCode: "BK-1039",
      guestId: guest3.id,
      roomId: room312.id,
      checkIn: new Date("2026-06-15"),
      checkOut: new Date("2026-06-18"),
      adults: 1,
      children: 0,
      total: 210,
      status: "CHECKED_OUT",
    },
  });

  await prisma.booking.create({
    data: {
      bookingCode: "BK-1038",
      guestId: guest4.id,
      roomId: room201.id,
      checkIn: new Date("2026-06-10"),
      checkOut: new Date("2026-06-12"),
      adults: 2,
      children: 0,
      total: 560,
      status: "CANCELLED",
    },
  });

  await prisma.booking.create({
    data: {
      bookingCode: "BK-1037",
      guestId: guest5.id,
      roomId: room410.id,
      checkIn: new Date("2026-06-08"),
      checkOut: new Date("2026-06-10"),
      adults: 2,
      children: 0,
      total: 280,
      status: "CHECKED_OUT",
    },
  });

  // =========================
  // ACTIVITIES
  // =========================

  await prisma.activity.createMany({
    data: [
      {
        title: "Guest Check-In",
        description: "Room 101 checked in — James Okafor",
        type: "BOOKING",
      },
      {
        title: "Housekeeping",
        description: "Room 205 housekeeping completed",
        type: "ROOM",
      },
      {
        title: "Booking Confirmed",
        description: "New booking BK-1041 confirmed",
        type: "BOOKING",
      },
      {
        title: "Guest Check-Out",
        description: "Room 312 checked out — Liu Wei",
        type: "BOOKING",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });