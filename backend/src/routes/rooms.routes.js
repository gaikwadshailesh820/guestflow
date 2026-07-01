const express = require("express");

const router = express.Router();

const controller = require("../controllers/room.controller");

const { asyncHandler } = require("../utils/asyncHandler");

router.get("/", asyncHandler(controller.getRooms));

router.get("/:id", asyncHandler(controller.getRoom));

router.post("/", asyncHandler(controller.createRoom));

router.put("/:id", asyncHandler(controller.updateRoom));

router.delete("/:id", asyncHandler(controller.deleteRoom));

module.exports = router;