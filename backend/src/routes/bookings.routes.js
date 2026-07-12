const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/booking.controller");
const { asyncHandler } = require("../utils/asyncHandler");

// Protect all booking routes
router.use(verifyToken);

router.get(
  "/",
  asyncHandler(controller.getBookings)
);

router.get(
  "/:id",
  asyncHandler(controller.getBooking)
);

router.post(
  "/",
  asyncHandler(controller.createBooking)
);

router.put(
  "/:id",
  asyncHandler(controller.updateBooking)
);

router.delete(
  "/:id",
  asyncHandler(controller.deleteBooking)
);

module.exports = router;