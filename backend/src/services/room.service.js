const prisma = require("../lib/prisma");
const { toApiRoom, toDbRoom } = require("../utils/roomMapper");

async function getAllRooms() {
  const rooms = await prisma.room.findMany({
    orderBy: {
      roomNumber: "asc",
    },
  });

  return rooms.map(toApiRoom);
}

async function getRoom(id) {
  const room = await prisma.room.findUnique({
    where: {
      roomNumber: id,
    },
  });

  return room ? toApiRoom(room) : null;
}

async function createRoom(data) {
  const roomNumber = data.roomNumber || data.id;

  const room = await prisma.room.create({
    data: {
      ...toDbRoom({
        ...data,
        id: roomNumber,
      }),
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });

  return toApiRoom(room);
}

async function updateRoom(id, data) {
  const existing = await prisma.room.findUnique({
    where: {
      roomNumber: id,
    },
  });

  if (!existing) return null;

  const room = await prisma.room.update({
    where: {
      roomNumber: id,
    },
    data: {
      ...toDbRoom({
        ...toApiRoom(existing),
        ...data,
      }),
    },
  });

  return toApiRoom(room);
}

async function deleteRoom(id) {
  const existing = await prisma.room.findUnique({
    where: {
      roomNumber: id,
    },
  });

  if (!existing) return false;

  await prisma.room.delete({
    where: {
      roomNumber: id,
    },
  });

  return true;
}

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};