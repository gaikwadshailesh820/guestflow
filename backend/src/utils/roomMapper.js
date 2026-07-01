const { RoomStatus, RoomType } = require("@prisma/client");

// Database -> Frontend
function toApiRoom(room) {
  return {
    id: room.roomNumber,
    type: {
      STANDARD_SINGLE: "Standard Single",
      DELUXE_DOUBLE: "Deluxe Double",
      SUITE: "Suite",
      PENTHOUSE: "Penthouse",
    }[room.type],

    floor: room.floor,
    capacity: room.capacity,
    price: room.price,
    ac: room.ac,

    status: {
      AVAILABLE: "Available",
      OCCUPIED: "Occupied",
      MAINTENANCE: "Maintenance",
    }[room.status],
  };
}

// Frontend -> Database
function toDbRoom(room) {
  return {
    roomNumber: room.id ?? room.roomNumber,

    type: {
      "Standard Single": RoomType.STANDARD_SINGLE,
      "Deluxe Double": RoomType.DELUXE_DOUBLE,
      Suite: RoomType.SUITE,
      Penthouse: RoomType.PENTHOUSE,
    }[room.type],

    floor: Number(room.floor),
    capacity: Number(room.capacity),
    price: Number(room.price),
    ac: Boolean(room.ac),

    status: {
      Available: RoomStatus.AVAILABLE,
      Occupied: RoomStatus.OCCUPIED,
      Maintenance: RoomStatus.MAINTENANCE,
    }[room.status],
  };
}

module.exports = {
  toApiRoom,
  toDbRoom,
};