const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const controller = require("../controllers/room.controller");
const { asyncHandler } = require("../utils/asyncHandler");

// Protect all room routes
router.use(verifyToken);

router.get("/", asyncHandler(controller.getRooms));
router.get("/:id", asyncHandler(controller.getRoom));
router.post("/", authorizeRoles("MANAGER"), asyncHandler(controller.createRoom));
router.put("/:id", authorizeRoles("MANAGER"), asyncHandler(controller.updateRoom));
router.delete("/:id", authorizeRoles("MANAGER"), asyncHandler(controller.deleteRoom));

module.exports = router;
