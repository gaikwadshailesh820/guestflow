const roomService = require("../services/room.service");
const { httpError } = require("../utils/asyncHandler");

exports.getRooms = async (req, res) => {
  const rooms = await roomService.getAllRooms();
  res.json(rooms);
};

exports.getRoom = async (req, res) => {
  const room = await roomService.getRoom(req.params.id);

  if (!room) {
    throw httpError(404, "Room not found");
  }

  res.json(room);
};

exports.createRoom = async (req, res) => {
  const room = await roomService.createRoom(req.body);

  res.status(201).json(room);
};

exports.updateRoom = async (req, res) => {
  const room = await roomService.updateRoom(req.params.id, req.body);

  if (!room) {
    throw httpError(404, "Room not found");
  }

  res.json(room);
};

exports.deleteRoom = async (req, res) => {
  const result = await roomService.deleteRoom(req.params.id);

  if (!result) {
    throw httpError(404, "Room not found");
  }

  if (result.error) {
    return res.status(409).json({
      message: result.error,
    });
  }

  return res.sendStatus(204);
};