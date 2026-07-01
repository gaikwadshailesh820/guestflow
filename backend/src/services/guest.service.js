const prisma = require("../lib/prisma");
const { toApiGuest, toDbGuest } = require("../utils/guestMapper");

async function getAllGuests() {
  const guests = await prisma.guest.findMany({
    orderBy: {
      guestCode: "asc",
    },
  });

  return guests.map(toApiGuest);
}

async function searchGuests(query) {
  if (!query || !query.trim()) {
    return getAllGuests();
  }

  const guests = await prisma.guest.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      guestCode: "asc",
    },
  });

  return guests.map(toApiGuest);
}

async function getGuest(id) {
  const guest = await prisma.guest.findUnique({
    where: {
      guestCode: id,
    },
  });

  if (!guest) return null;

  return toApiGuest(guest);
}

async function createGuest(data) {
  const guestCode = data.guestCode || data.id;

  const existing = await prisma.guest.findUnique({
    where: {
      guestCode,
    },
  });

  if (existing) {
    throw new Error(`Guest ${guestCode} already exists`);
  }

  const guest = await prisma.guest.create({
    data: toDbGuest({
      ...data,
      id: guestCode,
    }),
  });

  return toApiGuest(guest);
}

async function updateGuest(id, data) {
  const existing = await prisma.guest.findUnique({
    where: {
      guestCode: id,
    },
  });

  if (!existing) return null;

  const guest = await prisma.guest.update({
    where: {
      guestCode: id,
    },
    data: toDbGuest({
      ...toApiGuest(existing),
      ...data,
    }),
  });

  return toApiGuest(guest);
}

async function deleteGuest(id) {
  const existing = await prisma.guest.findUnique({
    where: {
      guestCode: id,
    },
  });

  if (!existing) return false;

  await prisma.guest.delete({
    where: {
      guestCode: id,
    },
  });

  return true;
}

module.exports = {
  getAllGuests,
  searchGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
};